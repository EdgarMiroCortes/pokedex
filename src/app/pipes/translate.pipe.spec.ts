import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslatePipe } from './translate.pipe';
import { TranslationService } from '../services/translation.service';

describe('TranslatePipe', () => {
  let pipe: TranslatePipe;
  let translationService: TranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TranslationService]
    });
    translationService = TestBed.inject(TranslationService);
    pipe = new TranslatePipe(translationService);
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform key to translation', () => {
    spyOn(translationService, 'getTranslation').and.returnValue('Tots');
    const result = pipe.transform('filters.all');
    expect(result).toBe('Tots');
  });

  it('should return key if translation not found', () => {
    spyOn(translationService, 'getTranslation').and.returnValue('non.existing.key');
    const result = pipe.transform('non.existing.key');
    expect(result).toBe('non.existing.key');
  });

  it('should handle empty string', () => {
    spyOn(translationService, 'getTranslation').and.returnValue('');
    const result = pipe.transform('');
    expect(result).toBe('');
  });
});
