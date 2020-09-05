import { action } from '@storybook/addon-actions';

import myBtn from '../components/my-btn.vue';

export default {
	title: 'Buttons',
	component: myBtn,
};

export const defaultButtons = (args) => ({
	components: { myBtn },
	template: `
  <div>
  <p>Text</p>
  <my-btn :color="color" :disabled="disabled" :loading="loading" :outlined="outlined" @click="buttonClickHandler">Button</my-btn>

  <p>Text and Icon</p>
   <my-btn :color="color" :disabled="disabled" :loading="loading" @click="buttonClickHandler">Button</my-btn>

    <p>Icon</p>
   <my-btn :color="color" :disabled="disabled" :loading="loading" @click="buttonClickHandler">Button</my-btn>
  </div>
  `,
	data() {
		return args;
	},

	methods: {
		buttonClickHandler: action('button was pressed'),
	},
});

defaultButtons.argTypes = {
	color: { control: { type: 'color' }, defaultValue: '#1867C0' },
	// disabled: { control: { type: 'boolean' }, defaultValue: false },
	// loading: { control: { type: 'boolean' }, defaultValue: false },
	// outlined: { control: { type: 'boolean' }, defaultValue: false },
};

// export const defaultButtonsIcon = (args) => ({
// 	components: { myBtn },
// 	template: `
//   <div>
// 	<p>RAISED</p>
//   <my-btn :color="color" :disabled="disabled" :loading="loading" @click="buttonClickHandler">Button</my-btn>
//   </div>
//   `,
// 	data() {
// 		return args;
// 	},

// 	methods: {
// 		buttonClickHandler: action('button was pressed'),
// 	},
// });

// defaultButtonsIcon.argTypes = {
// 	color: { control: { type: 'color' }, defaultValue: '#1867C0' },
// 	disabled: { control: { type: 'boolean' }, defaultValue: false },
// 	loading: { control: { type: 'boolean' }, defaultValue: false },
// };
