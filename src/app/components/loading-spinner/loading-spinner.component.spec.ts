import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display spinner image', () => {
    fixture.detectChanges();
    
    const spinnerImage = fixture.nativeElement.querySelector('img');
    expect(spinnerImage).toBeTruthy();
    expect(spinnerImage.src).toContain('icon.png');
    expect(spinnerImage.alt).toBe('Loading');
  });

  it('should display message when provided', () => {
    component.message = 'Loading pokémons...';
    fixture.detectChanges();
    
    const messageElement = fixture.nativeElement.querySelector('.loading-message');
    expect(messageElement).toBeTruthy();
    expect(messageElement.textContent).toContain('Loading pokémons...');
  });

  it('should not display message when not provided', () => {
    component.message = '';
    fixture.detectChanges();
    
    const messageElement = fixture.nativeElement.querySelector('.loading-message');
    expect(messageElement).toBeFalsy();
  });

  it('should apply correct size class', () => {
    component.size = 'large';
    fixture.detectChanges();
    
    const spinnerWrapper = fixture.nativeElement.querySelector('.spinner-wrapper');
    expect(spinnerWrapper.classList).toContain('size-large');
  });

  it('should apply default size class when no size specified', () => {
    fixture.detectChanges();
    
    const spinnerWrapper = fixture.nativeElement.querySelector('.spinner-wrapper');
    expect(spinnerWrapper.classList).toContain('size-medium');
  });

  it('should have spinner content container with white background', () => {
    fixture.detectChanges();
    
    const spinnerContent = fixture.nativeElement.querySelector('.spinner-content');
    expect(spinnerContent).toBeTruthy();
    expect(spinnerContent.classList).toContain('spinner-content');
  });

  it('should have correct structure', () => {
    fixture.detectChanges();
    
    const container = fixture.nativeElement.querySelector('.loading-spinner-container');
    const content = fixture.nativeElement.querySelector('.spinner-content');
    const wrapper = fixture.nativeElement.querySelector('.spinner-wrapper');
    const image = fixture.nativeElement.querySelector('img');
    
    expect(container).toBeTruthy();
    expect(content).toBeTruthy();
    expect(wrapper).toBeTruthy();
    expect(image).toBeTruthy();
  });
});




