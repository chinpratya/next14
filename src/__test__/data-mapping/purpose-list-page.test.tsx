import '@/testing/matchMedia.mock';
import '@/testing/canvas.mock';
import PurposePage from '@/pages/apps/datafence/data-mapping/purpose';
import { appRender, screen } from '@/testing/test-utils';

const router = {};

jest.mock('next/router', () => ({
  useRouter: () => router,
}));

describe('Purpose List Page', () => {
  it('should render the purpose list', () => {
    appRender(<PurposePage />);

    // @ts-ignore
    expect(
      screen.getAllByRole('heading', {
        name: 'Purpose',
      })
    );

    const table = screen.getByRole('table');

    // @ts-ignore
    expect(table).toBeInTheDocument();

    // @ts-ignore
    expect(table.rows[0].cells[0].innerHTML).toBe('ID');
    // @ts-ignore
    expect(table.rows[0].cells[1].innerHTML).toBe(
      'Purpose'
    );
    // @ts-ignore
    expect(table.rows[0].cells[2].innerHTML).toBe(
      'Legal Basis'
    );
    // @ts-ignore
    expect(table.rows[0].cells[3].innerHTML).toBe(
      'Group'
    );
    // @ts-ignore
    expect(table.rows[0].cells[4].innerHTML).toBe(
      'Status'
    );
    // @ts-ignore
    expect(table.rows[0].cells[5].innerHTML).toBe(
      'Version'
    );
    // @ts-ignore
    expect(table.rows[0].cells[6].innerHTML).toBe(
      'Organization'
    );
    // @ts-ignore
    expect(table.rows[0].cells[7].innerHTML).toBe(
      'Created Date'
    );
    // @ts-ignore
    expect(table.rows[0].cells[8].innerHTML).toBe(
      'Lest Updated Date'
    );
  });
});
