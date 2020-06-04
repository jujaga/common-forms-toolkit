<template>
  <v-container>
    <div v-if="submissionComplete">
      <h1 class="pb-8">
        <v-icon color="success">check_circle</v-icon>Your form has submitted successfully.
      </h1>
      <p>
        Please record the following
        <em>confirmation id</em> in your records:
      </p>
      <h2 class="mb-10">
        <blockquote>{{ submissionDetails.confirmationId }}</blockquote>
      </h2>

      <div class="d-print-none">
        <hr />

        <h3 class="my-4">Download a PDF or email yourself a copy of your form submission</h3>

        <v-row class="mb-6">
          <GeneratePdfButton :submissionId="this.submissionDetails.submissionId">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" color="primary" class="ml-5 mr-10" fab large>
                  <v-icon>picture_as_pdf</v-icon>
                </v-btn>
              </template>
              <span>Download PDF</span>
            </v-tooltip>
          </GeneratePdfButton>

          <RequestReceipt
            :email="this.submissionDetails.contacts[0].email"
            :submissionId="this.submissionDetails.submissionId"
          />
        </v-row>

        <hr />

        <p class="my-10">
          To start again and submit another form you can refresh this page (or
          <a
            href="#"
            @click="refresh"
          >
            click here
            <v-icon small color="primary">refresh</v-icon>
          </a>)
        </p>
      </div>
    </div>
    <div v-else>
      <BaseHeaderSection :text="'Please review your answers'" />
    </div>

    <v-row>
      <v-col offset-lg="1" cols="12" lg="10">
        <v-card outlined class="review-form">
          <h2 class="review-heading">
            1. Contact Information
            <v-btn
              v-if="!submissionComplete"
              color="primary"
              class="mx-5"
              fab
              x-small
              @click="setStep(1)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </h2>
          <Step1 :reviewMode="true" />
        </v-card>

        <v-card outlined class="review-form">
          <h2 class="review-heading">
            2. Before Operations Begin
            <v-btn
              v-if="!submissionComplete"
              color="primary"
              class="mx-5"
              fab
              x-small
              @click="setStep(2)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </h2>
          <Step2 :reviewMode="true" />
        </v-card>

        <v-card outlined class="review-form">
          <h2 class="review-heading">
            3. After Workers Arrive
            <v-btn
              v-if="!submissionComplete"
              color="primary"
              class="mx-5"
              fab
              x-small
              @click="setStep(3)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </h2>
          <Step3 :reviewMode="true" />
        </v-card>

        <v-card outlined class="review-form">
          <h2 class="review-heading">
            4. If Workers Become Ill
            <v-btn
              v-if="!submissionComplete"
              color="primary"
              class="mx-5"
              fab
              x-small
              @click="setStep(4)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </h2>
          <Step4 :reviewMode="true" />
        </v-card>
      </v-col>
    </v-row>

    <div v-if="!submissionComplete">
      <v-form v-model="step5Valid">
        <v-checkbox
          :rules="[v => !!v || 'You must certify to continue']"
          v-model="certifyAccurateInformation"
          label="I certify this information to be accurate"
        ></v-checkbox>
        <v-checkbox
          :rules="[v => !!v || 'You must agree to continue']"
          v-model="agreeToInspection"
          label="I agree that my Industrial Camps will be subject to a site inspection"
        ></v-checkbox>
      </v-form>
    </div>

    <div v-if="!submissionComplete">
      <v-btn color="primary" :disabled="!step5Valid" @click="submit">Submit</v-btn>
      <v-btn text @click="setStep(4)">Back</v-btn>
    </div>

    <v-dialog v-model="submitting" hide-overlay persistent width="300">
      <v-card color="#38598a" dark>
        <v-card-text class="pt-4">
          Submitting Form
          <v-progress-linear indeterminate color="white"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="submissionError" persistent max-width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2 mb-2" primary-title>
          <v-icon color="red">error</v-icon>Error
        </v-card-title>
        <v-card-text>{{ submissionError }}</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="setSubmissionError('')">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import GeneratePdfButton from '@/components/common/GeneratePdfButton.vue';
import RequestReceipt from '@/components/common/RequestReceipt.vue';
import Step1 from '@/components/forestrysectoropscreening/Step1.vue';
import Step2 from '@/components/forestrysectoropscreening/Step2.vue';
import Step3 from '@/components/forestrysectoropscreening/Step3.vue';
import Step4 from '@/components/forestrysectoropscreening/Step4.vue';

export default {
  name: 'ForestrySectorStep5',
  components: {
    GeneratePdfButton,
    RequestReceipt,
    Step1,
    Step2,
    Step3,
    Step4
  },
  data() {
    return {
      step5Valid: false
    };
  },
  computed: {
    ...mapGetters('forestrySectorOpScreeningForm', [
      'attestation',
      'submissionComplete',
      'submissionDetails',
      'submissionError',
      'submitting'
    ]),
    // Certify checkboxes
    certifyAccurateInformation: {
      get() {
        return this.attestation.certifyAccurateInformation;
      },
      set(value) {
        this.updateAttestation({ ['certifyAccurateInformation']: value });
      }
    },
    agreeToInspection: {
      get() {
        return this.attestation.agreeToInspection;
      },
      set(value) {
        this.updateAttestation({ ['agreeToInspection']: value });
      }
    }
  },
  methods: {
    ...mapMutations('forestrySectorOpScreeningForm', ['setStep', 'setSubmissionError', 'updateAttestation']),
    ...mapActions('forestrySectorOpScreeningForm', ['submitForm']),
    async submit() {
      await this.submitForm();
      if (this.submissionComplete) {
        // Once the form is done disable the native browser "leave site" message so they can quit without getting whined at
        window.onbeforeunload = null;
      }
    },
    refresh() {
      location.reload();
    }
  },
  mounted() {
    document
      .querySelectorAll('.review-form input, .review-form .v-select')
      .forEach(q => {
        q.setAttribute('readonly', 'true');
      });
  }
};
</script>

<style scoped lang="scss">
.review-form {
  font-size: smaller;
  margin-bottom: 2em;
  padding: 1em;
  .review-heading {
    margin-left: 0.5em;
    margin-bottom: 1em;
  }
  background-color: #efefef;
  &::v-deep {
    h3,
    .v-input--checkbox {
      margin-top: 0.2em !important;
    }
    .hide-on-review {
      display: none;
    }
  }
}
</style>