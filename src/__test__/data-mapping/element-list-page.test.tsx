import '@/testing/matchMedia.mock';
import '@/testing/canvas.mock';
import ElementPage from '@/pages/apps/datafence/data-mapping/elements';
import { appRender, screen } from '@/testing/test-utils';

const router = {};

jest.mock('next/router', () => ({
  useRouter: () => router,
}));

describe('Element List Page', () => {
  it('should render the Element list', () => {
    appRender(<ElementPage />);

    // @ts-ignore
    expect(
      screen.getAllByRole('heading', {
        name: 'Data Element List',
      })
    );

    const table = screen.getByRole('table');

    // @ts-ignore
    expect(table).toBeInTheDocument();

    // @ts-ignore
    expect(table.rows[0].cells[0].innerHTML).toBe('ID');
    // @ts-ignore
    expect(table.rows[0].cells[1].innerHTML).toBe('Name');
    // @ts-ignore
    expect(table.rows[0].cells[2].innerHTML).toBe(
      'Data Classification'
    );
    // @ts-ignore
    expect(table.rows[0].cells[3].innerHTML).toBe(
      'Organization'
    );
    // @ts-ignore
    expect(table.rows[0].cells[4].innerHTML).toBe(
      'Created Date'
    );
    // @ts-ignore
    expect(table.rows[0].cells[5].innerHTML).toBe(
      'Last Updated Date'
    );
  });
});
