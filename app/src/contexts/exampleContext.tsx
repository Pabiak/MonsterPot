import createFastContext from '../utility/context';

interface IExampleProviderProps {
  children: JSX.Element | JSX.Element[];
}

interface IExampleStore {
  accessToken: string;
  refreshToken: string;
  user: {
    identifier: string;
    name: string;
    surname: string;
    username: string;
  } | null;
}

type TExampleProvider = (props: IExampleProviderProps) => JSX.Element;

const { StoreContext, useStoreData, useStore } = createFastContext<IExampleStore>({
  accessToken: '',
  refreshToken: '',
  user: null,
});

export const useExampleStore = useStore;

const ExampleProvider: TExampleProvider = ({ children }) => (
  <StoreContext.Provider value={useStoreData()}>
    {children}
  </StoreContext.Provider>
);

export default ExampleProvider;
