import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/vue';

import BasicButton from '@/components/BasicButton.vue';
import TextField from '@/components/TextField.vue';

storiesOf('Button Components/BasicButton', module).add('Basic', () => ({
	components: { BasicButton },
	template: `
	<div>
	<h3>Default</h3>
	<basic-button :disabled="false" :loading="false">Login</basic-button>
	<h3>Disabled</h3>
	<basic-button :disabled="true" :loading="false">Login</basic-button>
	<h3>Loading</h3>
	<basic-button :disabled="false" :loading="true">Login</basic-button>
	</div>
	`,
}));

storiesOf('Input Components/TextField', module).add('Text Input', () => ({
	components: { TextField },
	data() {
		return {
			login: 'UserLogin',
		};
	},
	template: `
	<div>
	<h3>Default</h3>
	<text-field></text-field>

	<h3>Active</h3>
	<text-field :autofocus="true"></text-field>

	<h3>Filled</h3>
	<text-field v-model="login"></text-field>

	<h3>Disabled</h3>
	<text-field v-model="login" disabled></text-field>

	<h3>Error</h3>
	</div>	
	`,
}));

// export default {
// 	component: BasicButton,
// 	title: 'Buttons/',
// };

// export const Basic = () => ({
// 	components: { BasicButton },
// 	template: `
// 	<div>
// 	<h3>Default</h3>
// 	<basic-button :disabled="false" :loading="false">Login</basic-button>
// 	<h3>Disabled</h3>
// 	<basic-button :disabled="true" :loading="false">Login</basic-button>
// 	<h3>Loading</h3>
// 	<basic-button :disabled="false" :loading="true">Login</basic-button>
// 	</div>
// 	`,
// });
