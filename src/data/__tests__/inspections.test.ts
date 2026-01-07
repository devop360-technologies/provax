import { inspectionData, getInspectionStatusClass, getIntegrityScoreClass, calculatePrice, InspectionData } from '../inspections';

describe('inspectionData', () => {
  it('has 5 records with required properties', () => {
    expect(inspectionData).toHaveLength(5);
    const required = ['id', 'userId', 'vehicle', 'owner', 'date', 'aiModule', 'comboType', 'integrityScore', 'status', 'statusColor'];
    inspectionData.forEach((i) => required.forEach((p) => expect(i).toHaveProperty(p)));
  });

  it('has owner with name and image, unique ids, valid dates', () => {
    inspectionData.forEach((i) => {
      expect(i.owner).toHaveProperty('name');
      expect(i.owner).toHaveProperty('image');
      expect(i.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
    expect(new Set(inspectionData.map((i) => i.id)).size).toBe(inspectionData.length);
  });
});

describe('getInspectionStatusClass', () => {
  it.each([
    ['Approved', 'bg-green-500/20', 'text-green-400'],
    ['Processing', 'bg-yellow-500/20', 'text-yellow-400'],
    ['Pending', 'bg-blue-500/20', 'text-blue-400'],
    ['Unknown', 'bg-red-500/20', 'text-red-400'],
    ['', 'bg-red-500/20', 'text-red-400'],
  ])('returns correct class for %s', (status, bg, text) => {
    const result = getInspectionStatusClass(status);
    expect(result).toContain(bg);
    expect(result).toContain(text);
  });
});

describe('getIntegrityScoreClass', () => {
  it.each([
    ['90%', 'bg-green-500/20'], ['95%', 'bg-green-500/20'], ['100%', 'bg-green-500/20'],
    ['80%', 'bg-orange-500/20'], ['85%', 'bg-orange-500/20'], ['89%', 'bg-orange-500/20'],
    ['70%', 'bg-yellow-500/20'], ['75%', 'bg-yellow-500/20'], ['79%', 'bg-yellow-500/20'],
    ['50%', 'bg-red-500/20'], ['69%', 'bg-red-500/20'], ['0%', 'bg-red-500/20'],
    ['95', 'bg-green-500/20'], ['75', 'bg-yellow-500/20'],
  ])('returns correct class for %s', (score, expected) => {
    expect(getIntegrityScoreClass(score)).toContain(expected);
  });
});

describe('calculatePrice', () => {
  it.each([
    ['90%', 51000], ['100%', 55000], ['50%', 35000], ['80', 47000], ['0%', 15000],
  ])('calculates price for %s = %d', (score, expected) => {
    expect(calculatePrice(score)).toBe(expected);
  });
});

describe('InspectionData interface', () => {
  it('allows valid inspection object', () => {
    const inspection: InspectionData = {
      id: 'test-001', userId: 'user-001', vehicle: 'Test Vehicle',
      owner: { name: 'Test Owner', image: 'test.jpg' }, date: '2024-01-01',
      aiModule: 'Test Module', comboType: 'Test Combo', integrityScore: '95%',
      status: 'Approved', statusColor: 'bg-green-500/20 text-green-400',
    };
    expect(inspection.id).toBe('test-001');
  });

  it('allows optional id', () => {
    const inspection: InspectionData = {
      userId: 'user-001', vehicle: 'Test Vehicle', owner: { name: 'Test Owner', image: '' },
      date: '2024-01-01', aiModule: 'Test Module', comboType: 'Test Combo',
      integrityScore: '95%', status: 'Approved', statusColor: 'bg-green-500/20 text-green-400',
    };
    expect(inspection.id).toBeUndefined();
  });
});
