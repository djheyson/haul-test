import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UploadInspectionsForm } from './UploadInspectionsForm';

describe('UploadInspectionsForm', () => {
  it('should render successfully', () => {
    const refetch = vi.fn();
    const { baseElement } = render(<UploadInspectionsForm refetch={refetch} />);
    expect(baseElement).toBeTruthy();
  });
});
