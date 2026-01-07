import {
  inspectionData,
  getInspectionStatusClass,
  getIntegrityScoreClass,
  calculatePrice,
  InspectionData,
} from '../inspections';

describe('inspectionData', () => {
  it('should have 5 inspection records', () => {
    expect(inspectionData).toHaveLength(5);
  });

  it('should have required properties for each inspection', () => {
    inspectionData.forEach((inspection) => {
      expect(inspection).toHaveProperty('id');
      expect(inspection).toHaveProperty('userId');
      expect(inspection).toHaveProperty('vehicle');
      expect(inspection).toHaveProperty('owner');
      expect(inspection).toHaveProperty('date');
      expect(inspection).toHaveProperty('aiModule');
      expect(inspection).toHaveProperty('comboType');
      expect(inspection).toHaveProperty('integrityScore');
      expect(inspection).toHaveProperty('status');
      expect(inspection).toHaveProperty('statusColor');
    });
  });

  it('should have owner with name and image', () => {
    inspectionData.forEach((inspection) => {
      expect(inspection.owner).toHaveProperty('name');
      expect(inspection.owner).toHaveProperty('image');
    });
  });

  it('should have unique ids', () => {
    const ids = inspectionData.map((i) => i.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have valid date format', () => {
    inspectionData.forEach((inspection) => {
      expect(inspection.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});

describe('getInspectionStatusClass', () => {
  it('should return green class for Approved status', () => {
    const result = getInspectionStatusClass('Approved');
    expect(result).toContain('bg-green-500/20');
    expect(result).toContain('text-green-400');
  });

  it('should return yellow class for Processing status', () => {
    const result = getInspectionStatusClass('Processing');
    expect(result).toContain('bg-yellow-500/20');
    expect(result).toContain('text-yellow-400');
  });

  it('should return blue class for Pending status', () => {
    const result = getInspectionStatusClass('Pending');
    expect(result).toContain('bg-blue-500/20');
    expect(result).toContain('text-blue-400');
  });

  it('should return red class for unknown status', () => {
    const result = getInspectionStatusClass('Unknown');
    expect(result).toContain('bg-red-500/20');
    expect(result).toContain('text-red-400');
  });

  it('should return red class for empty string', () => {
    const result = getInspectionStatusClass('');
    expect(result).toContain('bg-red-500/20');
  });
});

describe('getIntegrityScoreClass', () => {
  it('should return green class for score >= 90', () => {
    expect(getIntegrityScoreClass('90%')).toContain('bg-green-500/20');
    expect(getIntegrityScoreClass('95%')).toContain('bg-green-500/20');
    expect(getIntegrityScoreClass('100%')).toContain('bg-green-500/20');
  });

  it('should return orange class for score >= 80 and < 90', () => {
    expect(getIntegrityScoreClass('80%')).toContain('bg-orange-500/20');
    expect(getIntegrityScoreClass('85%')).toContain('bg-orange-500/20');
    expect(getIntegrityScoreClass('89%')).toContain('bg-orange-500/20');
  });

  it('should return yellow class for score >= 70 and < 80', () => {
    expect(getIntegrityScoreClass('70%')).toContain('bg-yellow-500/20');
    expect(getIntegrityScoreClass('75%')).toContain('bg-yellow-500/20');
    expect(getIntegrityScoreClass('79%')).toContain('bg-yellow-500/20');
  });

  it('should return red class for score < 70', () => {
    expect(getIntegrityScoreClass('50%')).toContain('bg-red-500/20');
    expect(getIntegrityScoreClass('69%')).toContain('bg-red-500/20');
    expect(getIntegrityScoreClass('0%')).toContain('bg-red-500/20');
  });

  it('should handle numeric strings without %', () => {
    expect(getIntegrityScoreClass('95')).toContain('bg-green-500/20');
    expect(getIntegrityScoreClass('75')).toContain('bg-yellow-500/20');
  });
});

describe('calculatePrice', () => {
  it('should calculate price based on integrity score', () => {
    expect(calculatePrice('90%')).toBe(90 * 400 + 15000);
    expect(calculatePrice('90%')).toBe(51000);
  });

  it('should calculate price for 100% score', () => {
    expect(calculatePrice('100%')).toBe(100 * 400 + 15000);
    expect(calculatePrice('100%')).toBe(55000);
  });

  it('should calculate price for low score', () => {
    expect(calculatePrice('50%')).toBe(50 * 400 + 15000);
    expect(calculatePrice('50%')).toBe(35000);
  });

  it('should handle numeric strings', () => {
    expect(calculatePrice('80')).toBe(80 * 400 + 15000);
  });

  it('should return base price for 0% score', () => {
    expect(calculatePrice('0%')).toBe(15000);
  });
});

describe('InspectionData interface', () => {
  it('should allow creating valid inspection object', () => {
    const inspection: InspectionData = {
      id: 'test-001',
      userId: 'user-001',
      vehicle: 'Test Vehicle',
      owner: { name: 'Test Owner', image: 'test.jpg' },
      date: '2024-01-01',
      aiModule: 'Test Module',
      comboType: 'Test Combo',
      integrityScore: '95%',
      status: 'Approved',
      statusColor: 'bg-green-500/20 text-green-400',
    };
    expect(inspection.id).toBe('test-001');
  });

  it('should allow optional id', () => {
    const inspection: InspectionData = {
      userId: 'user-001',
      vehicle: 'Test Vehicle',
      owner: { name: 'Test Owner', image: '' },
      date: '2024-01-01',
      aiModule: 'Test Module',
      comboType: 'Test Combo',
      integrityScore: '95%',
      status: 'Approved',
      statusColor: 'bg-green-500/20 text-green-400',
    };
    expect(inspection.id).toBeUndefined();
  });
});
