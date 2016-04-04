module.exports = function(Job) {
	 var app = require('../../server/server');

	 Job.applyForJob = function(jobId, applicant, cb) {
		 var Applicant = app.models.Applicant;

		 // validation!
		 // email is NOT an id, so you can add the same applicant to different jobs
		 // but not the same applicant to same job
			Applicant.find(function(err,res){
				 console.log('inside Applicant.find with email: ', applicant.email);
				 applicants = [];
				 if (res.length === 0) {
					 applicants.push(applicant);
					 console.log("before there was nobody and now there's somebody");
					 console.log("applicants: ", applicants);
				 } else {
					 res.forEach(function(app){
						 console.log('inside forEach');
						 if(app.email.indexOf(applicant.email) < 0){
							 applicants.push(applicant);
							 console.log("I am inside the if statement and I just pushed an applicant! This applicant: ", applicant);
						 } else {
							 console.log("This applicant has already applied for this job");
						 }
					 });
				 }
				 /*
				  POST /Jobs/{id}/applicants
					*/
			 });

		 console.log("who? ", applicant);
		 console.log("job id ", jobId);
		 cb(null, applicant);
	 }

  Job.remoteMethod(
      'applyForJob',
      {
				accepts: [
					{arg: 'jobid', type: 'string', required: true },
					{arg: 'applicant', type: 'Applicant', http: { source: 'body' } }
				],
        http: {path: '/:jobid/apply-for-job'},
        returns: { arg: 'applicant', type: 'Applicant', root: true}
      }
	);

};
