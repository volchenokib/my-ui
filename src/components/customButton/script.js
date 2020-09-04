import './style.scss';

export default {
	name: 'customButton',

	methods: {
		genContent() {
			return this.$createElement(
				'span',
				{
					staticClass: 'button__content',
				},
				this.$slots.default
			);
		},
	},

	render: function(createElement) {
		const children = [this.genContent()];
		return createElement('button', {}, children);
	},
};
