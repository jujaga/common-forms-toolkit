<template>
  <v-container>
    <div class="hide-on-review">
      <BaseHeaderSection :text="'Before operations begin, please check all that apply'" />
    </div>

    <BaseInfoCard class="hide-on-review mt-5 mb-8">
      Please note questions
      <strong>2, 3, and 4</strong> are not relevant if your accommodation is a private residence.
    </BaseInfoCard>

    <div class="question-series">
      <h3 class="question-head">1. COVID-19 Information</h3>
      <div class="questions">
        <p
          class="hide-on-review"
        >Agriculture and Seafood Operators need to make workers aware of the risks of COVID-19 and be prepared if workers have questions about COVID-19.</p>

        <v-checkbox
          v-model="protectionSignage"
          data-test="cb-form-protectionSignage"
          :readonly="reviewMode"
          label="I have signage in place in the appropriate language on how employees can protect themselves from COVID-19 "
        ></v-checkbox>
        <v-checkbox
          v-model="workerContactPersonnel"
          data-test="cb-form-workerContactPersonnel"
          :readonly="reviewMode"
          label="I have someone identified that workers can go to if they have questions on COVID-19"
        ></v-checkbox>
      </div>
    </div>

    <div class="question-series">
      <h3 class="question-head">2. Provide safe lodging and accommodation: General Worker</h3>

      <div class="questions">
        <p class="hide-on-review">
          Operators that are providing accommodation must minimize crowding by determining accommodation capacity that allows for sufficient physical distance
          (individual tents or beds 2m apart and head-to-toe in shared accommodation).
        </p>

        <v-checkbox
          v-model="sharedSleepingDistancing"
          data-test="cb-form-sharedSleepingDistancing"
          :readonly="reviewMode"
          label="I understand the physical distancing requirements between tents and have communicated to employees the expectation to maximize spacing between beds within tents (2m or head-to-toe)."
        ></v-checkbox>

        <v-checkbox
          v-model="sharedSleepingCommunication"
          data-test="cb-form-sharedSleepingCommunication"
          :readonly="reviewMode"
          label="I have a plan to communicate physical distancing requirements to my employees (e.g. posting physical distancing signs in the accommodation area)."
        ></v-checkbox>

        <v-checkbox
          v-model="sharedSleepingProvidedAccommodations"
          data-test="cb-form-sharedSleepingProvidedAccommodations"
          :readonly="reviewMode"
          label="Accommodations that are provided have been oriented to allow 2 m physical distance between beds, head-to-toe orientation, and/or are separated by impermeable barriers."
        ></v-checkbox>
      </div>
    </div>

    <div class="question-series">
      <h3
        class="question-head"
      >3. Self-isolation space if a worker comes down with COVID-19-like symptoms</h3>
      <div class="questions">
        <v-checkbox
          v-model="selfIsolateUnderstood"
          data-test="cb-form-selfIsolateUnderstood"
          :readonly="reviewMode"
          label="I understand what is needed for a person to self-isolate."
        ></v-checkbox>
        <v-checkbox
          v-model="selfIsolateAccommodation"
          data-test="cb-form-selfIsolateAccommodation"
          :readonly="reviewMode"
          label="I have the accommodation to let a worker self-isolate in a separate accommodation than other workers or arrange for separate accommodation."
        ></v-checkbox>
      </div>
    </div>

    <div class="question-series">
      <h3 class="question-head">4. Make sure laundry services are available and handled safely</h3>
      <div class="questions">
        <p
          class="hide-on-review"
        >Laundry must be performed properly to reduce the risk of disease transmission of COVID-19, including using hot water for laundry machines and having adequate supply of detergent.</p>
        <v-checkbox
          v-model="laundryServices"
          data-test="cb-form-laundryServices"
          :readonly="reviewMode"
          label="I have laundry services available for regular use"
        ></v-checkbox>
      </div>
    </div>

    <div class="question-series">
      <h3 class="question-head">5. Practicing waste management: At work-site and accommodation</h3>
      <div class="questions">
        <p
          class="hide-on-review"
        >Proper collection and removal of garbage is crucial to reducing the risk of disease transmission. This includes wearing disposable gloves to remove waste from rooms and common areas and using sturdy, leak resistant garbage bags for containing waste.</p>
        <v-checkbox
          v-model="wasteManagementGloves"
          data-test="cb-form-wasteManagementGloves"
          :readonly="reviewMode"
          label="I have disposable gloves for the handling of garbage"
        ></v-checkbox>
        <v-checkbox
          v-model="wasteManagementSchedule"
          data-test="cb-form-wasteManagementSchedule"
          :readonly="reviewMode"
          label="I have a waste removal schedule"
        ></v-checkbox>
        <v-checkbox
          v-model="wasteManagementBags"
          data-test="cb-form-wasteManagementBags"
          :readonly="reviewMode"
          label="I have sturdy, leak resistant garbage bags"
        ></v-checkbox>
      </div>
    </div>

    <div class="question-series">
      <h3
        class="question-head"
      >6. Have proper hand-washing facilities: At work-site and accommodation</h3>
      <div class="questions">
        <p
          class="hide-on-review"
        >Helping workers to engage in hand hygiene prevents or reduces the spread of COVID-19 and other illnesses. Operators should ensure easy access to hand hygiene facilities either through hand hygiene stations or the provisions of hand sanitizer at the work site and at the accommodation site.</p>
        <v-checkbox
          v-model="handWashingStations"
          data-test="cb-form-handWashingStations"
          :readonly="reviewMode"
          label="I have an adequate number of hand washing stations (either permanent or portable) available to workers"
        ></v-checkbox>
        <v-checkbox
          v-model="handWashingSoapWater"
          data-test="cb-form-handWashingSoapWater"
          :readonly="reviewMode"
          label="There is an appropriate supply of soap and water "
        ></v-checkbox>
        <v-checkbox
          v-model="handWashingWaterless"
          data-test="cb-form-handWashingWaterless"
          :readonly="reviewMode"
          label="I have supplemented with waterless hand sanitizers with a min of 60% alcohol where appropriate"
        ></v-checkbox>
        <v-checkbox
          v-model="handWashingPaperTowels"
          data-test="cb-form-handWashingPaperTowels"
          :readonly="reviewMode"
          label="I have provided disposable paper towels"
        ></v-checkbox>
        <v-checkbox
          v-model="handWashingSignage"
          data-test="cb-form-handWashingSignage"
          :readonly="reviewMode"
          label="I have put up signs to promote regular hand washing"
        ></v-checkbox>
      </div>
    </div>

    <div class="question-series">
      <h3 class="question-head">7. Physical Distancing Practices</h3>
      <div class="questions">
        <div class="hide-on-review">
          <p>Keeping a 2 meter distance between people is one of the most important ways to break the chain of transmission of COVID-19. Operators can take practical steps to ensure physical distancing is maintained while workers are transported to or from the work site, while working indoors or outdoors, during break times.</p>
          <p>Physical barriers such as the use of plexi-glass, face shields, masks, and other techniques can be used where physical distancing is not possible.</p>
        </div>
        <v-checkbox
          v-model="distancingMaintained"
          data-test="cb-form-distancingMaintained"
          :readonly="reviewMode"
          label="I have taken steps to ensure physical distancing can be maintained during work and after work."
        ></v-checkbox>
        <v-checkbox
          v-model="distancingFaceShields"
          data-test="cb-form-distancingFaceShields"
          :readonly="reviewMode"
          label="I have physical barriers like face shields or masks for situations where physical distancing is not possible."
        ></v-checkbox>
      </div>
    </div>

    <div class="question-series">
      <h3 class="question-head">8. Have a Cleaning and Disinfecting Schedule</h3>
      <div class="questions">
        <p>All common areas and surfaces should be cleaned at the start and end of each day. Examples of common areas and surfaces include washrooms, common tables, desks, light switches, and door handles. Regular household cleaners are effective against COVID-19, following the instructions on the label.</p>
        <v-checkbox
          v-model="disinfectingSchedule"
          data-test="cb-form-disinfectingSchedule"
          :readonly="reviewMode"
          label="I have a schedule to ensure common and high touch areas are cleaned or disinfected at the start and end of each day"
        ></v-checkbox>
      </div>
    </div>

    <div class="question-series">
      <h3 class="question-head">9. Transportation of Workers</h3>
      <div class="questions">
        <p>Modes of transportation (choose all that apply)</p>
        <div class="questions-check-group">
          <v-checkbox
            v-model="transportationSingleOccupant"
            data-test="cb-form-transportationSingleOccupant"
            :readonly="reviewMode"
            label="One person per vehicle"
          ></v-checkbox>
          <v-checkbox
            v-model="transportationBusesVans"
            data-test="cb-form-transportationBusesVans"
            :readonly="reviewMode"
            label="Buses or Vans"
          ></v-checkbox>
          <v-checkbox
            v-model="transportationTrucksCars"
            data-test="cb-form-transportationTrucksCars"
            :readonly="reviewMode"
            label="Trucks and Cars"
          ></v-checkbox>
          <v-checkbox
            v-model="transportationHelicopter"
            data-test="cb-form-transportationHelicopter"
            :readonly="reviewMode"
            label="Helicopter"
          ></v-checkbox>
        </div>
        <v-checkbox
          v-model="transportationTravelPod"
          data-test="cb-form-transportationTravelPod"
          :readonly="reviewMode"
          label="I have made arrangements so that where workers are required to travel together in vehicles or helicopters to the work site, workers will travel with their work pod."
        ></v-checkbox>
        <v-checkbox
          v-model="transportationCleaningDistancing"
          data-test="cb-form-transportationCleaningDistancing"
          :readonly="reviewMode"
          label="Procedures for frequent vehicle cleaning and physical distancing or use personal protective equipment have been developed and communicated to the workers prior to being transported to the worksite."
        ></v-checkbox>
      </div>
    </div>

    <div class="hide-on-review">
      <v-btn color="primary" @click="setStep(3)" data-test="btn-form-to-next-step">
        <span>Go to Step 3</span>
      </v-btn>
      <v-btn text @click="setStep(1)" data-test="btn-form-to-previous-step">
        <span>Back</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'AgriSeaStep2',
  props: {
    reviewMode: Boolean
  },
  data() {
    return {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  },
  computed: {
    ...mapGetters('agriSeafoodOpScreeningForm', ['attestation']),

    // COVID 19 info
    protectionSignage: {
      get() {
        return this.attestation.protectionSignage;
      },
      set(value) {
        this.updateAttestation({ ['protectionSignage']: value });
      }
    },
    workerContactPersonnel: {
      get() {
        return this.attestation.workerContactPersonnel;
      },
      set(value) {
        this.updateAttestation({ ['workerContactPersonnel']: value });
      }
    },

    // Lodging
    sharedSleepingDistancing: {
      get() {
        return this.attestation.sharedSleepingDistancing;
      },
      set(value) {
        this.updateAttestation({ ['sharedSleepingDistancing']: value });
      }
    },
    sharedSleepingCommunication: {
      get() {
        return this.attestation.sharedSleepingCommunication;
      },
      set(value) {
        this.updateAttestation({ ['sharedSleepingCommunication']: value });
      }
    },
    sharedSleepingProvidedAccommodations: {
      get() {
        return this.attestation.sharedSleepingProvidedAccommodations;
      },
      set(value) {
        this.updateAttestation({ ['sharedSleepingProvidedAccommodations']: value });
      }
    },

    // Self-isolation
    selfIsolateUnderstood: {
      get() {
        return this.attestation.selfIsolateUnderstood;
      },
      set(value) {
        this.updateAttestation({ ['selfIsolateUnderstood']: value });
      }
    },
    selfIsolateAccommodation: {
      get() {
        return this.attestation.selfIsolateAccommodation;
      },
      set(value) {
        this.updateAttestation({ ['selfIsolateAccommodation']: value });
      }
    },

    // Laundry
    laundryServices: {
      get() {
        return this.attestation.laundryServices;
      },
      set(value) {
        this.updateAttestation({ ['laundryServices']: value });
      }
    },

    // Waste mgmt
    wasteManagementGloves: {
      get() {
        return this.attestation.wasteManagementGloves;
      },
      set(value) {
        this.updateAttestation({ ['wasteManagementGloves']: value });
      }
    },
    wasteManagementSchedule: {
      get() {
        return this.attestation.wasteManagementSchedule;
      },
      set(value) {
        this.updateAttestation({ ['wasteManagementSchedule']: value });
      }
    },
    wasteManagementBags: {
      get() {
        return this.attestation.wasteManagementBags;
      },
      set(value) {
        this.updateAttestation({ ['wasteManagementBags']: value });
      }
    },

    // Hand-washing
    handWashingStations: {
      get() {
        return this.attestation.handWashingStations;
      },
      set(value) {
        this.updateAttestation({ ['handWashingStations']: value });
      }
    },
    handWashingSoapWater: {
      get() {
        return this.attestation.handWashingSoapWater;
      },
      set(value) {
        this.updateAttestation({ ['handWashingSoapWater']: value });
      }
    },
    handWashingWaterless: {
      get() {
        return this.attestation.handWashingWaterless;
      },
      set(value) {
        this.updateAttestation({ ['handWashingWaterless']: value });
      }
    },
    handWashingPaperTowels: {
      get() {
        return this.attestation.handWashingPaperTowels;
      },
      set(value) {
        this.updateAttestation({ ['handWashingPaperTowels']: value });
      }
    },
    handWashingSignage: {
      get() {
        return this.attestation.handWashingSignage;
      },
      set(value) {
        this.updateAttestation({ ['handWashingSignage']: value });
      }
    },

    // Phyisical Distancing
    distancingMaintained: {
      get() {
        return this.attestation.distancingMaintained;
      },
      set(value) {
        this.updateAttestation({ ['distancingMaintained']: value });
      }
    },
    distancingFaceShields: {
      get() {
        return this.attestation.distancingFaceShields;
      },
      set(value) {
        this.updateAttestation({ ['distancingFaceShields']: value });
      }
    },

    // Cleaning/Disinfecting
    disinfectingSchedule: {
      get() {
        return this.attestation.disinfectingSchedule;
      },
      set(value) {
        this.updateAttestation({ ['disinfectingSchedule']: value });
      }
    },

    // Transportation
    transportationSingleOccupant: {
      get() {
        return this.attestation.transportationSingleOccupant;
      },
      set(value) {
        this.updateAttestation({ ['transportationSingleOccupant']: value });
      }
    },
    transportationBusesVans: {
      get() {
        return this.attestation.transportationBusesVans;
      },
      set(value) {
        this.updateAttestation({ ['transportationBusesVans']: value });
      }
    },
    transportationTrucksCars: {
      get() {
        return this.attestation.transportationTrucksCars;
      },
      set(value) {
        this.updateAttestation({ ['transportationTrucksCars']: value });
      }
    },
    transportationHelicopter: {
      get() {
        return this.attestation.transportationHelicopter;
      },
      set(value) {
        this.updateAttestation({ ['transportationHelicopter']: value });
      }
    },
    transportationTravelPod: {
      get() {
        return this.attestation.transportationTravelPod;
      },
      set(value) {
        this.updateAttestation({ ['transportationTravelPod']: value });
      }
    },
    transportationCleaningDistancing: {
      get() {
        return this.attestation.transportationCleaningDistancing;
      },
      set(value) {
        this.updateAttestation({ ['transportationCleaningDistancing']: value });
      }
    }
  },
  methods: {
    ...mapMutations('agriSeafoodOpScreeningForm', [
      'setStep',
      'updateAttestation'
    ])
  }
};
</script>

