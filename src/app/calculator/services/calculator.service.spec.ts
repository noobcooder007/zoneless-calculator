import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
    let service: CalculatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CalculatorService);
    });

    beforeAll(() => {});
    afterEach(() => {});
    afterAll(() => {});

    it('Should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Should be created with', () => {
        expect(service.resultText()).toBe('0');
        expect(service.subResultText()).toBe('0');
        expect(service.lastOperator()).toBe('+');
    });

    it('Should set resultText, subResultText to "0" when "C" is pressed', () => {
        expect(service.resultText.set('123'));
        expect(service.subResultText.set('456'));
        expect(service.lastOperator.set('x'));
        service.constructNumber('C');
        expect(service.resultText()).toBe('0');
        expect(service.subResultText()).toBe('0');
        expect(service.lastOperator()).toBe('+');
    });

    it('Should update resultText with number input', () => {
        service.constructNumber('1');
        expect(service.resultText()).toBe('1');
        service.constructNumber('2');
        expect(service.resultText()).toBe('12');
    });
    
    it('Should handle operators correctly', () => {
        service.constructNumber('1');
        service.constructNumber('-');
        expect(service.lastOperator()).toBe('-');
        expect(service.subResultText()).toBe('1');
        expect(service.resultText()).toBe('0');
    });
    it('Should calculate result correctly for addition', () => {
        service.constructNumber('1');
        service.constructNumber('+');
        service.constructNumber('2');
        service.constructNumber('=');
        expect(service.resultText()).toBe('3');
    });
    it('Should calculate result correctly for subtraction', () => {
        service.constructNumber('5');
        service.constructNumber('-');
        service.constructNumber('2');
        service.constructNumber('=');
        expect(service.resultText()).toBe('3');
    });
    it('Should calculate result correctly for multiplication', () => {
        service.constructNumber('2');
        service.constructNumber('x');
        service.constructNumber('2');
        service.constructNumber('=');
        expect(service.resultText()).toBe('4');
    });
    it('Should calculate result correctly for division', () => {
        service.constructNumber('2');
        service.constructNumber('÷');
        service.constructNumber('2');
        service.constructNumber('=');
        expect(service.resultText()).toBe('1');
    });
    it('Should handle decimal point correctly', () => {
        service.constructNumber('1');
        service.constructNumber('.');
        service.constructNumber('5');
        expect(service.resultText()).toBe('1.5');
        service.constructNumber('.');
        expect(service.resultText()).toBe('1.5');
    });
    it('Should handle decimal point correctly starting with zero', () => {
        service.constructNumber('0');
        service.constructNumber('.');
        service.constructNumber('.');
        service.constructNumber('.');
        service.constructNumber('.');
        service.constructNumber('0');
        expect(service.resultText()).toBe('0.0');
    });
    it('Should handle sign change correctly', () => {
        service.constructNumber('1');
        service.constructNumber('+/-');
        expect(service.resultText()).toBe('-1');
        service.constructNumber('+/-');
        expect(service.resultText()).toBe('1');
    });
    it('Should handle backspace correctly', () => {
        service.resultText.set('123');
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('12');
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('1');
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('0');
    });
    it('Should handle max length correctly', () => {
        for (let i = 0; i < 10; i++) {
            service.constructNumber('1');
        }
        expect(service.resultText().length).toBe(10);
        service.constructNumber('1');
        expect(service.resultText().length).toBe(10);
    });
});