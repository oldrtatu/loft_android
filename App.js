import App from './src/navigator/index';
import React from 'react';

import { GlobalContextProvider } from './src/provider';

const AppMain = () => (
	<GlobalContextProvider>
		<App />
	</GlobalContextProvider>
);

export default AppMain;
