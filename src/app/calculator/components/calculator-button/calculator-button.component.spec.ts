import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';

@Component({
    standalone: true,
    imports: [CalculatorButtonComponent],
    template: `
        <calculator-button>
            <span class="projected-content underline">Test content</span>
        </calculator-button>
    `,
})
class TestHostComponent {}

describe('CalculatorButtonComponent', () => {
    let fixture: ComponentFixture<CalculatorButtonComponent>;
    let compiled: HTMLElement;
    let component: CalculatorButtonComponent;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CalculatorButtonComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(CalculatorButtonComponent);
        compiled = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('Should apply w-1/4 if doubleSize is false', () => {
        const hostCssClasses: string[] = compiled.classList.value.split(' ');
        expect(hostCssClasses).toContain('w-1/4');
        expect(component.isDoubleSize()).toBeFalsy();
    });
    
    it('Should apply w-2/4 if doubleSize is true', () => {
        fixture.componentRef.setInput('isDoubleSize', true)
        fixture.detectChanges();
        const hostCssClasses: string[] = compiled.classList.value.split(' ');
        expect(hostCssClasses).toContain('w-2/4');
        expect(component.isDoubleSize()).toBeTruthy();
    });

    it('Should emit onClick when handleClick is called', () => {
        spyOn(component.onClick, 'emit');
        component.handleClick();
        expect(component.onClick.emit).toHaveBeenCalled();
    });

    it('Should set isPressed to true and then false when keyboardPressStyle is called with a matching key', (done) => {
        component.contentValue()!.nativeElement.innerText = '1';
        component.keyboardPressedStyle('1');
        expect(component.isPressed()).toBeTruthy();
        setTimeout(() => {
            expect(component.isPressed()).toBeFalsy();
            done();
        }, 101);
    });
    
    it('Should not set isPressed to true if key is not matching', () => {
        component.contentValue()!.nativeElement.innerText = '1';
        component.keyboardPressedStyle('2');
        expect(component.isPressed()).toBeFalsy();
    });

    it('Should display projected content', () => {
        const testHostFixture = TestBed.createComponent(TestHostComponent);
        const compiled = testHostFixture.nativeElement as HTMLDivElement;
        const projectedContent = compiled.querySelector('.projected-content');
        expect(projectedContent).not.toBeNull();
        expect(projectedContent?.classList.contains('underline')).toBeTrue();
    });
});
