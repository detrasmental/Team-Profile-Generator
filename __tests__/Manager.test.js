const Manager = require('../lib/Manager');

test('creates an Manager object', () => {
    const manager = new Manager('Detra', 90, 'Detra.gordon76@gmail', 4);
    
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

test('gets role of employee', () => {
    const manager = new Manager('Detra', 90, 'Detra.gordon76@gmail.com');

    expect(manager.getRole()).toEqual("Manager");
}); 