import { ChangeDetectorRef, Directive, inject, Input, OnDestroy, OnInit } from "@angular/core";
import { FieldMode, IField } from '../../form.field';
import { FormControl } from '@angular/forms';
import { toValidator, ValidatorStr } from '../../form.validation';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Directive()
export abstract class FieldComp<T extends IField> implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
    this.control.setValidators([]);
    console.log('destroy');
  }
  @Input() field!: T;
  @Input() mode = FieldMode.LIVE;
  @Input() control!: FormControl;
  private readonly cdr = inject(ChangeDetectorRef)
  readonly modeForm = FieldMode;
  readonly $destroy: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    const validators = (this.field?.validators || []).map((it: any) => {
      if ((toValidator as any)[it]) {
        return (toValidator as any) [it](this.field);
      } else {
        return it;
      }
    });
    if (this.field.required) {
      validators.push(toValidator[ValidatorStr.required](this.field)); // add required validators
    }
    this.control.setValidators(validators);
    if (this.field.disabled) {
       this.control.disable();
    }
    if(this.field.onChange) {
      this.control.valueChanges.pipe(takeUntil(this.$destroy)).subscribe( () => {
        if(this.field.onChange) {
          this.field.onChange(this.field, this.control);
        }
      });
    }
    this.control.statusChanges.pipe(takeUntil(this.$destroy)).subscribe( it => {
      this.cdr.markForCheck();
    })
  }
  markForCheck() {
    this.cdr.markForCheck();
  }
 }
