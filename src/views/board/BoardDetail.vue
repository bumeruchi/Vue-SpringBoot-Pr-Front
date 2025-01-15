<template>
    <div class="board-detail">
        <!-- <div class="common-buttons">
            <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnUpdate">수정</button>&nbsp;
            <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button>&nbsp;
            <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
        </div> -->
        <div class="board-contents">
            <h1 class="custom-title">{{ title || '제목 없음' }}</h1>
            <div>
                <strong class="w3-large">{{ author || '작성자 없음' }}</strong>
                <br>
                <span>{{ created_at || '날짜없음'}}</span>
            </div>
        </div>
        <div class="board-contents">
            <span>{{ contents || '내용 없음' }}</span>
        </div>
        <div class="common-buttons">
            <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnUpdate">수정</button>&nbsp;
            <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button>&nbsp;
            <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
        </div>
    </div>
</template>

<script>
export default {
    data() { //변수생성
        return {
            requestBody: this.$route.query,
            idx: this.$route.query.idx,

            title: '',
            author: '',
            contents: '',
            created_at: ''
        }
    },
    mounted() {
        this.fnGetView()
    },
    methods: {
        fnGetView() {
            this.$axios.get(this.$serverUrl + '/board/' + this.idx, {
                params: this.requestBody
            }).then((res) => {
                console.log('Before update:', this.title); // 업데이트 전
                this.title = res.data.title
                this.author = res.data.author
                this.contents = res.data.contents
                this.created_at = res.data.created_at
                console.log('Updated Title:', this.title); // 업데이트된 데이터 확인
            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                    alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
                }
            })
        },
        fnList() {
            delete this.requestBody.idx
            this.$router.push({
                path: './list',
                query: this.requestBody
            })
        },
        fnUpdate() {
            this.$router.push({
                path: './write',
                query: this.requestBody
            })
        },
        fnDelete() {
            if (!confirm("삭제하시겠습니까?")) return

            this.$axios.delete(this.$serverUrl + '/board/' + this.idx, {})
                .then(() => {
                    alert('삭제되었습니다.')
                    this.fnList();
                }).catch((err) => {
                    console.log(err);
                })
        }
    }
}
</script>
<style scoped>
.custom-title {
    color: green;
    /* 텍스트 색상 강제 적용 */
    background-color: beige;
    /* 배경색 */
}
</style>