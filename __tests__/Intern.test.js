const Intern = require('../lib/Intern');


test('creates an Intern object', () => {
    const intern = new Intern('Detra', 90, 'Detra.gordon76@gmail', 'UCF');
    
    expect(intern.school) .toEqual(expect.any(String));
});


test('gets employee school', () => {
    const intern = new Intern('Detra', 90, 'Detra.gordon76@gmail', 'UCF');
    
    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});

test('gets role of employee', () => {
    const intern = new Intern('Detra', 90, 'Detra.gordon76@gmail.com', 'UCF');

    expect(intern.getRole()).toEqual("Intern");
}); 