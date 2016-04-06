module.exports = function(Job) {
	var app = require('../../server/server');

	Job.applyForJob = function(jobId, applicant, cb) {
		var Applicant = app.models.Applicant;
		console.log("who is applying? ", applicant);
		console.log("job id ", jobId);
		Job.findById(jobId, function(err, job){
			if (err){
				cb(err,null);
			}
			if (!err){
				Applicant.findOrCreate({where: {email : applicant.email}}, applicant, function(err2, applicant, created){
					if(err2){
						console.log("error2: ", err2);
						cb(err2, null);
					}
					if(!err2){
					//logic for adding the relationship
					job.applicants.add(applicant, function(err3) {
						if(err3){
							console.log("error3:", err3);
							cb(err3, null);
						}
						if (!err3){
							cb(null, "You have successfully applied for the job!");
						}
					});
				}
				});
			}
		});
	};

	Job.remoteMethod(
		'applyForJob',
		{
			accepts: [
				{arg: 'jobid', type: 'string', required: true },
				{arg: 'applicant', type: 'Applicant', http: { source: 'body' } }
			],
			http: {path: '/:jobid/apply-for-job'},
			returns: { arg: 'applicant', type: 'Applicant', root: true }
		}
	);
}
