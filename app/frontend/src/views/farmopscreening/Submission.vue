<template>
  <v-container>
    <BaseSecure :resource="resource" viewer>
      <v-progress-linear indeterminate v-if="gettingForm" color="primary" class="mb-2" />

      <v-alert v-if="getFormError" type="error" tile dense>{{ getFormError }}</v-alert>

      <div v-if="!gettingForm && attestation">

        <!-- Operation Type has been hidden for this form -->
        <!-- <SubmissionHeader
          :attestation="attestation"
          :business="business"
          :formName="formName"
          :location="location"
          :submissionId="submissionId"
          :operationType="operationType"
        /> -->
        <SubmissionHeader
          :attestation="attestation"
          :business="business"
          :formName="formName"
          :location="location"
          :submissionId="submissionId"
        />

        <v-row>
          <v-col cols="12" md="8" class="pl-0 pt-0">
            <AdminReviewSubmission />
          </v-col>
          <v-col cols="12" md="4" class="pl-0 d-print-none" order="first" order-md="last">
            <InspectionPanel
              :submissionId="submissionId"
              v-on:note-updated="refreshNotes"
              :formName="formName"
            />

            <NotesPanel :submissionId="submissionId" ref="notesPanel" :formName="formName" />
          </v-col>
        </v-row>
      </div>
    </BaseSecure>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import AdminReviewSubmission from '@/components/farmopscreening/admin/AdminReviewSubmission.vue';
import InspectionPanel from '@/components/common/admin/inspection/InspectionPanel.vue';
import NotesPanel from '@/components/common/admin/inspection/NotesPanel.vue';
import SubmissionHeader from '@/components/common/admin/SubmissionHeader.vue';
import { AppClients, FormNames } from '@/utils/constants';

export default {
  name: 'Submission',
  components: {
    AdminReviewSubmission,
    InspectionPanel,
    NotesPanel,
    SubmissionHeader
  },
  props: {
    submissionId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    error: false
  }),
  computed: {
    ...mapGetters('farmOpScreeningForm', [
      'business',
      'location',
      'gettingForm',
      'getFormError',
      'attestation',
      'operationType'
    ]),
    formName() {
      return FormNames.FARMOPSCREENING;
    },
    resource() {
      return AppClients.FARMOPSCREENING;
    }
  },
  methods: {
    ...mapMutations('farmOpScreeningForm', ['setGettingForm']),
    ...mapActions('farmOpScreeningForm', ['getForm']),
    refreshNotes() {
      this.$refs.notesPanel.getNotes();
    }
  },
  async created() {
    this.setGettingForm(true);
    await this.getForm(this.submissionId);
  }
};
</script>
