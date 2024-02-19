import '@/testing/matchMedia.mock';
import '@/testing/canvas.mock';
import RopaPage from '@/pages/apps/datafence/data-mapping/ropa';
import { appRender, screen } from '@/testing/test-utils';

const router = {};

jest.mock('next/router', () => ({
  useRouter: () => router,
}));

describe('Ropa List Page', () => {
  it('should render the ropa list', () => {
    appRender(<RopaPage />);

    // @ts-ignore
    expect(
      screen.getAllByRole('heading', {
        name: 'ROPA',
      })
    );

    const table = screen.getByRole('table');

    // @ts-ignore
    expect(table).toBeInTheDocument();

    // @ts-ignore
    expect(table.rows[0].cells[0].innerHTML).toBe('ID');
    // @ts-ignore
    expect(table.rows[0].cells[1].innerHTML).toBe(
      'Version'
    );
    // @ts-ignore
    expect(table.rows[0].cells[2].innerHTML).toBe(
      'DC or DP'
    );
  });
});
