declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.scss' {
  const value: any;
  export default value;
}

declare module 'enzyme-adapter-react-16' {
  import { EnzymeAdapter } from 'enzyme';
  const adapter: typeof EnzymeAdapter;
  export default adapter;
}
