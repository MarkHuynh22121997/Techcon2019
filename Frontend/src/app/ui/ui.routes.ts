import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { TransactionComponent } from './transaction/transaction.component';
import { VotingPoolComponent } from './voting-pool/voting-pool.component';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { Routes } from '@angular/router';
export const UiRoute: Routes = [
  { path: 'transaction', component: TransactionComponent },
  { path: '', component: HomeComponent},
  { path: 'account', component: AccountComponent},
  { path: 'votingPool', component: VotingPoolComponent},
  { path: 'addCandidate', component: AddCandidateComponent}
];


