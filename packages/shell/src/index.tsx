import { renderInstance } from 'piral';
import { layout, errors } from './layout';

// Render the Piral instance
renderInstance({
  layout,
  errors,
  requestPilets() {
    // In production, this would fetch pilets from a feed service
    // For development, we'll register them manually
    return Promise.resolve([]);
  },
});
