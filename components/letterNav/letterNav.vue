<style scoped lang="scss">
    .top-bar {
        height: 2rem;
        display: flex;
        flex-direction: row;


        .top-bar-list {
            width: 50%;
            text-align: center;
            line-height: 2rem;
            font-size: 1rem;
        }
    }

    .active {
        border-bottom: 1px solid black;
        color: #41B883;
    }

    .normal{
        border: 0;
        color: white;
    }



</style>

<template>
    <div class="top-bar">
        <div
                class="top-bar-list"
                :style="show ? 'color: #41B883;':'color: black;'"
                @click="switchTitle('writeLetter')"
        >
            信件
        </div>
        <div
                class="top-bar-list"
                :style="!show ? 'color: #41B883;':'color: black;'"
                @click="switchTitle('shudongList')"
        >
            树洞
        </div>
    </div>
</template>

<script>
    export default {
        name: 'letterNav',

        data() {
            return {
                show: true
            }
        },

        methods: {
            switchTitle (module) {
                this.show = !this.show
                this.$emit('changeModule', {
                    module: module
                })
            }
        }
    }
</script>


