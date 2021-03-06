<template>
  <div class="col-8 align-self-center">
    {{ goal.val }}
    <v-slider
      v-model="goal.val"
      :label="goal.label"
      :max="goal.max"
      :min="goal.min"
      :step="goal.step"
    />

    Наличие зарплатной карты ВТБ
    <v-radio-group mandatory>
      <v-radio label="Имеется" value="card-yes"></v-radio>
      <!-- уменьшает размер ставки на (запрос с сервера) -->
      <v-radio label="Отсутствует" value="card-no"></v-radio>
    </v-radio-group>

    Стоимость жилья
    <v-text-field v-model="cost.val" mandatory />

    Первоначальный взнос
    <v-text-field mandatory />

    Срок кредита
    <v-text-field mandatory />

    <v-row justify="center">
      <v-dialog v-model="modal" scrollable>
        <template v-slot:activator="{ on, attrs }">
          <div class="my-3">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Рассчитать срок платежа
            </v-btn>
          </div>
        </template>
        <v-card>
          <v-card-title>Рассчет платежа</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-center">
                    Месяцы
                  </th>
                  <th class="text-center">
                    Ежемесячный платеж
                  </th>
                  <th class="text-center">
                    Погашение процентов
                  </th>
                  <th class="text-center">
                    Погашение тела кредита
                  </th>
                  <th class="text-center">
                    Долг на конец месяца
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in annuitetResults" :key="item.name">
                  <td>{{ item.month }}</td>
                  <td>{{ item.payment }}</td>
                  <td>{{ item.percent }}</td>
                  <td>{{ item.debt }}</td>
                  <td>{{ item.remain }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="closemodal = false">
              Закрыть
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  GoalType,
  CostType,
  FirstpayType,
  TermType,
  AnnuitetResultType
} from "@/types/vtb";

@Component
export default class Vtb extends Vue {
  cost: CostType = {
    val: 500000,
    label: "Стоимость жилья",
    max: 50000000 /*с сервера*/,
    min: 500000 /*с сервера*/,
    step: 10000 /*с сервера*/
  };
  firstpay: FirstpayType = {
    val: 1,
    label: "Первоначальный взнос",
    max: this.cost.val,
    min: 1 /*с сервера*/,
    step: 10000 /*с сервера*/
  };
  goal: GoalType = {
    val: 50000,
    label: "Цель кредита",
    max: 50000000 /*с сервера*/,
    min: 500000 /*с сервера*/,
    step: 10000 /*с сервера*/
  };
  term: TermType = {
    val: 12,
    label: "Срок кредита",
    max: 50 /*с сервера*/,
    min: 1 /*с сервера*/,
    step: 1
  };
  modal = false;
  closemodal = true;
  annuitetResults: AnnuitetResultType[] = [];
  loanratemonth = 0.018; //с сервера
  get annuitcoef() {
    return (
      this.loanratemonth +
      this.loanratemonth / (((1 + this.loanratemonth) ^ this.term.val) - 1)
    );
  }
  get payment() {
    return this.annuitcoef * this.goal.val;
  }

  @Watch("modal")
  annuitetResultsComputing() {
    this.annuitetResults = [];
    let month = 0;
    let remain = this.goal.val;
    if (this.payment > 0) {
      for (remain; remain > 0; ) {
        remain -= Math.round(this.payment);
        month++;
        if (remain < 0) {
          const percent = Math.round((this.payment + remain) * this.annuitcoef);
          const debt = Math.round(this.payment + remain - percent);
          this.annuitetResults.push({
            month,
            payment: this.payment + remain,
            percent,
            debt,
            remain: 0
          });
        } else {
          const percent = Math.round(remain * this.annuitcoef);
          const debt = Math.round(this.payment - percent);
          this.annuitetResults.push({
            month,
            payment: this.payment,
            percent,
            debt,
            remain
          });
        }
      }
    }
  }
}
</script>
