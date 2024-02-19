import { SignupFlow } from './signup-flow';

describe('<SignupFlow />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SignupFlow />);
  });
});
