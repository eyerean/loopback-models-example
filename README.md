Read Me
=======

A remote method of a model <i>[Job]</i> uses the schema of another model <i>[Applicant]</i> to POST data.

The Applicant can <i>apply</i> for more than one jobs.

Models are linked with hasAndBelongsToMany relation

##### What has been done:

   * Use of one model inside another:


     module.exports = function(Job) {
       var app = require('../../server/server');

       Job.applyForJob = function(jobId, applicant, cb) {
         var Applicant = app.models.Applicant;
[...]

     accepts: [
       {arg: 'jobid', type: 'string', required: true },
       {arg: 'applicant', type: 'Applicant', http: { source: 'body' } }
     ]

   * Remote method for custom endpoint:


    Job.applyForJob = function(jobId, applicant, cb) { [..] };

[...]

    Job.remoteMethod(
      'applyForJob',
      {	http: {path: '/:jobid/apply-for-job'}, [...] });


   * Nested validation for both models:


    Job.findById(jobId, function(err, job){ [...] });

[...]

    Applicant.findOrCreate({where: {email : applicant.email}}, applicant, function(err2, applicant, created){ [...] });



   * Added new relation between models:


    job.applicants.add(applicant, function(err3) { [...] });




API created in Loopback.

##### Strongloop relevant documentation:
  * [Working with LoopBack objects](https://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects)
  * [Remote Methods](https://docs.strongloop.com/display/public/LB/Remote+methods#Remotemethods-HTTPmappingofinputarguments)
  * [HasAndBelongsToMany relations](https://docs.strongloop.com/display/public/LB/HasAndBelongsToMany+relations)
  * [PersistedModel Static Methods](https://apidocs.strongloop.com/loopback/#persistedmodel)
