import { LoginRequestDto } from './contracts';

describe('contracts', () => {
  it('should define login request contract shape', () => {
    const payload: LoginRequestDto = {
      email: 'dev@example.com',
      password: 'secret',
    };

    expect(payload.email).toContain('@');
  });
});
