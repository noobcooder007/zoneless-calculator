import { CalculatorService } from '@/calculator/services/calculator.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';

class MockCalculatorService {
    public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
    public subResultText = jasmine.createSpy('subResultText').and.returnValue('0');
    public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

    public constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {
    let fixture: ComponentFixture<CalculatorComponent>;
    let compiled: HTMLElement;
    let component: CalculatorComponent;
    let mockCalculatorService: MockCalculatorService;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CalculatorComponent],
            providers: [
                {
                    provide: CalculatorService,
                    useClass: MockCalculatorService
                }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(CalculatorComponent);
        compiled = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;
        mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;
        // fixture.detectChanges();
    });

    it('Should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('Should have the current getters', () => {
        expect(component.resultText()).toBe('100.00');
        expect(component.subResultText()).toBe('0');
        expect(component.lastOperator()).toBe('+');
    });

    it('Should display proper calculation values', () => {
        mockCalculatorService.resultText.and.returnValue('123');
        mockCalculatorService.subResultText.and.returnValue('456');
        mockCalculatorService.lastOperator.and.returnValue('x');
        fixture.detectChanges();
        expect(compiled.querySelector('span')?.innerText).toBe('456 x')
        expect(component.resultText()).toBe('123');
        expect(component.subResultText()).toBe('456');
        expect(component.lastOperator()).toBe('x');
    });

    it('Should have 19 calculator-buttons components', () => {
        expect(component.calculatorButtons()).toBeTruthy();
        expect(component.calculatorButtons().length).toBe(19);
    });

    it('Should have 19 calculator-buttons components with content projection', () => {
        // const buttonsByDirective = fixture.debugElement.queryAll(
        //     By.directive(CalculatorButtonComponent)
        // );
        const buttons = compiled.querySelectorAll('calculator-button');
        expect(buttons.length).toBe(19);
        expect(buttons[0].textContent?.trim()).toBe('C');
        expect(buttons[1].textContent?.trim()).toBe('+/-');
        expect(buttons[2].textContent?.trim()).toBe('%');
        expect(buttons[3].textContent?.trim()).toBe('÷');
    });

    it('Should handle keyboard events correctly', () => {
        const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
        document.dispatchEvent(eventEnter);
        expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');
        const eventEscape = new KeyboardEvent('keyup', { key: 'Escape' });
        document.dispatchEvent(eventEscape);
        expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
    });

    it('Should display result text correctly', () => {
        mockCalculatorService.resultText.and.returnValue('123');
        mockCalculatorService.subResultText.and.returnValue('10');
        mockCalculatorService.lastOperator.and.returnValue('-');
        fixture.detectChanges();
        expect(component.resultText()).toBe('123');
        expect(compiled.querySelector('#sub-result')?.textContent).toContain('10 -');
    });
});
