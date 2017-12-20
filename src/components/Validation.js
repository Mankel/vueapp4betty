
const isFunction = f => 'function' === typeof f;

export default {
    methods: {
        _toggleError (ref, valid) {
            let target = this.$refs[ref];
            if (target) {
                let className = target.className || '';
                if (true === valid) {
                    target.className = target.className.replace('is-error', '');
                } else if (false === valid) {
                    target.className += ' is-error';
                }
            }
            console.log(target.className);
        },
        validate (rules) {
            let isAllValid = true;
            for (let key of Object.keys(rules)) {
                let valid = false;
                let rule = rules[key];
                if (isFunction(rule)) {
                    valid = rule();
                } else{
                    valid = !!rule;
                }
                this._toggleError(key, valid);
                if (!valid) {
                    isAllValid = false;
                }
            }
            return isAllValid;
        }
    }
};
