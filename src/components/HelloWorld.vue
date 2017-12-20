<template>
    <div ref="ref">
        <div>
            <span ref="aa"><input v-model="formData.a" /></span>
            <span ref="bb"><input v-model.number="formData.b" /></span>
            <span ref="cc"><input v-model="formData.c" /></span>
            <button @click="submit">验证</button>
            <div>是否通过验证：{{validMessage}}</div>
        </div>
    </div>
</template>

<script>
    import Validation from './Validation';

    export default {
        name: 'HelloWorld',
        extends: Validation,
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                formData: {
                    a: 1,
                    b: 2,
                    c: 'test',
                },
                rules: {
                    aa: true,
                    bb: _ => {
                        return this.formData.b === 3;
                    },
                    cc: _ => {
                        return this.formData.c === 'test';
                    }
                },
                validMessage: null
            };
        },
        mounted () {
            console.log(this.$refs.ref);
//            this.$refs.ref.className = 'is-error';
        },
        methods: {
            submit () {
                let valid = this.validate(this.rules);
                this.isValid = valid;
                if (!valid) {
                    this.validMessage = '有错误';
                } else {

                    this.validMessage = null;
                }
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    span { border: 1px solid gray; padding: 2px;}
    .is-error {border: 2px solid red;}
</style>
