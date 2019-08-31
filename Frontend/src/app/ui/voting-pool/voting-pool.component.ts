import { contract } from 'truffle-contract';
import { Component, OnInit } from '@angular/core';
import { ContractService } from './../../services/contract/contract.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { MdcSnackbar, ErrorStateMatcher } from '@angular-mdc/web';

type TransactionField = 'sendaddress' | 'amount';
type FormErrors = {[u in TransactionField]: string};

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-voting-pool',
  templateUrl: './voting-pool.component.html',
  styleUrls: ['./voting-pool.component.scss']
})
export class VotingPoolComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  
  direction: string;
  address: string;
  amount: string;
  balance: string;
  success: boolean;
  compatible: boolean;
  transactionDone: boolean;
  candidates = [
    {
      name:"Candidate 1",
      vote: 3,
      description: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.",
      img: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    }, 
    {
      name:"Candidate 2",
      vote: 4,
      description: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.",
      img: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    }, 
    {
      name:"Candidate 3",
      vote: 7,
      description: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.",
      img: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    }, 
    {
      name:"Candidate 4",
      vote: 7,
      description: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.",
      img: "https://material.angular.io/assets/img/examples/shiba2.jpg"
    }
  ];

  transactionForm: FormGroup;
  formErrors: FormErrors = {
    sendaddress: '',
    amount: '',
  };
  validationMessages = {
   sendaddress: {
   required: 'The send address is required ',
   pattern: 'that´s no looks like a valid address',
   minlength: 'a address must have much than 40 characters',

   },
   amount: {
     required: 'Need a amount to sent to address',
     pattern: 'Only support numbers',
   },
  };
  
// tslint:disable-next-line: no-shadowed-variable
  constructor(private frb: FormBuilder, private contract: ContractService, private snackbar: MdcSnackbar) {
   this.compatible = contract.compatible;
   contract.seeAccountInfo().then((value: any) => {
      this.direction = value.originAccount;
      this.balance = value.balance;
    }).catch((error: any) => {
      contract.failure('Could not get the account data, please check if metamask is running correctly and refresh the page');
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.transactionForm = this.frb.group({
      sendaddress: ['', [
          Validators.required,
          Validators.minLength(42),
        ]
      ],
      amount : ['', [
          Validators.required,
          Validators.pattern(/^[+-]?\d+(\.\d+)?$/),
        ]
      ],
    });
    this.transactionForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged();
  }

  reset() {
    this.transactionForm.reset();
  }

  onValueChanged(data?: any) {
    if (!this.transactionForm) { return; }
    const form = this.transactionForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'sendaddress' || field === 'amount')) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key) ) {
                this.formErrors[field] += `${(messages as {[key: string]: string})[key]} `;
              }
            }
          }
        }
      }
    }
  }
}
