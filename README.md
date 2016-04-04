Read Me
=======

A remote method of a model [Job] uses the schema of another model [Applicant] to POST data.
It took me quite some time to figure it all out, so here it is.

Code is not completed, will be refactored, but the important part is this:

    module.exports = function(Job) {
      var app = require('../../server/server');
      Job.applyForJob = function(jobId, applicant, cb) {
        var Applicant = app.models.Applicant;

and this:

    accepts: [
      {arg: 'jobid', type: 'string', required: true },
      {arg: 'applicant', type: 'Applicant', http: { source: 'body' } }
    ]


API created in Loopback.
