var students =	[
					{
						name:'Mary Contrary', 
						id:'1'
					},
					{
						name:'Jack Sprat', 
						id:'2'
					},
					{
						name:'Jill Hill', 
						id:'3'
					}
				];

function StudentListController($scope) 
{
	$scope.students = students;
}
