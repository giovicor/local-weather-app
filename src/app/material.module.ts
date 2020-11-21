import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'

/*
  Optimize your code to store modules in an array
  and reuse it to import and export
*/

const modules = [MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule]

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
