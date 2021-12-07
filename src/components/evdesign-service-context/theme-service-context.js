import React from 'react';

const { Provider : ThemeServiceProvider,
	 Consumer : ThemeServiceConsumer
	 } = React.createContext();

export {
	ThemeServiceProvider,
	ThemeServiceConsumer
};