const chesService = require('../../components/chesService');
const fs = require('fs');
const log = require('npmlog');

class EmailService {

  constructor(dataService, assetsPath) {
    this._dataService = dataService;
    this._assetsPath = assetsPath;

    this._submissionEmailBody = null;
    this._confirmationEmailBody = null;
    this._statusAssignmentEmailBody = null;
    this._accessRequestedEmailBody = null;
  }

  async _getSubmissionEmailContexts(settings, submission, to) {
    return [
      {
        context: {
          confirmationNumber: submission.confirmationId,
          title: settings.config.title,
          messageLinkText: settings.config.messageLinkText,
          messageLinkUrl: `${settings.config.messageLinkUrl}/${submission.submissionId}`
        },
        to: [to]
      }
    ];
  }

  async sendSubmissionEmail(submission, to) {
    try {
      const settings = await this._dataService.readSettings('submissionEmail');
      if (settings && settings.enabled) {
        if (!this._submissionEmailBody) {
          this._submissionEmailBody = fs.readFileSync(`${this._assetsPath}/${settings.config.template}`, 'utf8');
        }

        const contexts = await this._getSubmissionEmailContexts(settings, submission, to);

        const data = {
          body: this._submissionEmailBody,
          bodyType: 'html',
          contexts: contexts,
          ...settings.config
        };
        return await chesService.merge(data);
      } else {
        return false;
      }
    } catch (err) {
      log.error('sendSubmissionEmail', `Error: ${err.message}.`);
      log.error(err);
      throw err;
    }
  }

  async _getConfirmationEmailContexts(settings, submission) {
    const to = settings.config.to.split(',').filter(x => x);
    return [
      {
        context: {
          confirmationNumber: submission.confirmationId,
          title: settings.config.title,
          messageLinkText: settings.config.messageLinkText,
          messageLinkUrl: `${settings.config.messageLinkUrl}/${submission.submissionId}`
        },
        to: to
      }
    ];
  }

  async sendConfirmationEmail(submission) {
    try {
      const settings = await this._dataService.readSettings('confirmationEmail');
      if (settings && settings.enabled) {
        if (!this._confirmationEmailBody) {
          this._confirmationEmailBody = fs.readFileSync(`${this._assetsPath}/${settings.config.template}`, 'utf8');
        }

        const contexts = await this._getConfirmationEmailContexts(settings, submission);

        const data = {
          body: this._confirmationEmailBody,
          bodyType: 'html',
          contexts: contexts,
          ...settings.config
        };
        return await chesService.merge(data);
      } else {
        return false;
      }
    } catch (err) {
      log.error('sendConfirmationEmail', `Error: ${err.message}.`);
      log.error(err);
      throw err;
    }
  }

  async _getStatusAssignmentEmailContexts(settings, submission, statusUpdate) {
    const statusCodes = await this._dataService.readCurrentStatusCodes();
    const statusCode = statusCodes.find(x => x.code === statusUpdate.code);
    return [
      {
        context: {
          confirmationNumber: submission.confirmationId,
          business: submission.business.name,
          status: statusCode.display,
          message: settings.config.message,
          title: settings.config.title,
          messageLinkText: settings.config.messageLinkText,
          messageLinkUrl: `${settings.config.messageLinkUrl}/${submission.submissionId}`
        },
        to: [statusUpdate.assignedToEmail]
      }
    ];
  }

  async sendStatusAssignmentEmail(statusUpdate) {
    try {
      const settings = await this._dataService.readSettings('statusAssignmentEmail');
      if (settings && settings.enabled && statusUpdate.assignedToEmail) {
        if (!this._statusAssignmentEmailBody) {
          this._statusAssignmentEmailBody = fs.readFileSync(`${this._assetsPath}/${settings.config.template}`, 'utf8');
        }

        const submission = await this._dataService.readSubmission(statusUpdate.submissionId);
        const contexts = await this._getStatusAssignmentEmailContexts(settings, submission, statusUpdate);

        const data = {
          body: this._statusAssignmentEmailBody,
          bodyType: 'html',
          contexts: contexts,
          ...settings.config
        };
        return await chesService.merge(data);
      } else {
        return false;
      }
    } catch (err) {
      log.error('sendStatusAssignmentEmail', `Error: ${err.message}`);
      log.error(err);
      throw err;
    }
  }

  async _getAccessRequestedEmailContexts(settings, accessRequest) {
    const to = settings.config.to.split(',').filter(x => x);
    return [
      {
        context: {
          title: settings.config.title,
          userInfo: `${accessRequest.firstName} ${accessRequest.lastName} - ${accessRequest.email}`,
          message: settings.config.message,
          messageLinkText: settings.config.messageLinkText,
          messageLinkUrl: `${settings.config.messageLinkUrl}`
        },
        to: to
      }
    ];
  }

  async sendAccessRequestedEmail(accessRequest) {
    try {
      const settings = await this._dataService.readSettings('accessRequestedEmail');
      if (settings && settings.enabled) {
        if (!this._accessRequestedEmailBody) {
          this._accessRequestedEmailBody = fs.readFileSync(`${this._assetsPath}/${settings.config.template}`, 'utf8');
        }

        const contexts = await this._getAccessRequestedEmailContexts(settings, accessRequest);

        const data = {
          body: this._accessRequestedEmailBody,
          bodyType: 'html',
          contexts: contexts,
          ...settings.config
        };
        return await chesService.merge(data);
      } else {
        return false;
      }
    } catch (err) {
      log.error('sendAccessRequestedEmail', `Error: ${err.message}.`);
      log.error(err);
      throw err;
    }
  }

}

class OperationTypesEmailService extends EmailService {
  constructor(dataService, assetsPath) {
    super(dataService, assetsPath);
  }

  async _getSubmissionEmailContexts(settings, submission, to) {
    const result = await super._getSubmissionEmailContexts(settings, submission, to);
    result.every(x => x.context.operationType = submission.operationType.display);
    return result;
  }

  async _getConfirmationEmailContexts(settings, submission) {
    const result = await super._getConfirmationEmailContexts(settings, submission);
    result.every(x => x.context.operationType = submission.operationType.display);
    return result;
  }

  async _getStatusAssignmentEmailContexts(settings, submission, statusUpdate) {
    const result = await super._getStatusAssignmentEmailContexts(settings, submission, statusUpdate);
    result.every(x => x.context.operationType = submission.operationType.display);
    return result;
  }

}

module.exports.EmailService = EmailService;
module.exports.OperationTypesEmailService = OperationTypesEmailService;
