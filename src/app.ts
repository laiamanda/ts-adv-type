type Admin = {
    name: string;
    privileges:string[]
};

type Employee = {
    name: string;
    startDate: Date;
}
// interface ElevatedEmployee extends Employee,Admin {};

type ElevatedEmployee = Admin & Employee;
const el: ElevatedEmployee = {
    name: 'Amanda',
    privileges: ['create-server'],
    startDate : new Date(),
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a:number, b:number): number; // OVERLOADING
function add(a: string, b:string): string; // OVERLOADING

// Type Guard
function add(a: Combinable, b: Combinable){
    if(typeof a === 'string' || typeof b ==='string'){
        return a.toString() + b.toString();
    }
    return a + b;
}

// FUNCTION OVERLOAD
const result = add(1,5);
const result1 = add('Amanda', "L") as string;
result1.split(' ');

// OPTIONAL CHAINING
const fetchUserData = {
    id: 'u1',
    name: 'Amanda',
    job: { title: 'CEO', description: 'My Own Company'}
};
// console.log(fetchUserData.job.title);
console.log(fetchUserData?.job?.title);

// NULLISH COALESCING

const userInput2 = ''; // const userInput2 = undefined;
const storedData = userInput2 ?? 'DEFAULT';
console.log(storedData);

type UnknownEmployee = Employee | Admin;

function printEmployee(emp: UnknownEmployee){
    console.log('Name: '+ emp.name);
    if('privileges' in emp){
        console.log('Privileges: '+ emp.privileges);
    }
    if('startDate' in emp){
        console.log('Start Date: '+ emp.startDate)
    }
}

printEmployee({name: 'Amanda', startDate: new Date()});

class Car {
    drive() {
        console.log('Driving...');
    }
}

class Truck {
    drive(){
        console.log('Driving...')
    }
    loadCargo(amount: number){
        console.log('Loading cargo...'+ amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle){
    vehicle.drive();
    if(vehicle instanceof Truck){ // 'loadCargo' in vehicle
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);

// Discriminating Unions
interface Bird {
    type: 'bird';
    flyingSpeed: number;
}
interface Horse {
    type: 'horse'
    runningSpeed: number;
}

type Animal = Bird | Horse;
function moveAnimal(animal: Animal) {
    let speed;
    switch(animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log( 'Moving at speed: '+ speed)
}
moveAnimal({type: 'bird', flyingSpeed: 10});

// TYPE CASTING
// const paragraph = document.querySelector('p');

//Version 1
// const userInput = <HTMLInputElement>document.getElementById('user-input')! ;
// userInput.value = 'Hi there!'

// Version 2
const userInput =document.getElementById('user-input')! as HTMLInputElement ;
userInput.value = 'Hi there!'

// no !
const userInputElement =document.getElementById('user-input');
if(userInputElement) {
    (userInput as HTMLInputElement).value = 'Hi there!'
}

// INDEX TYPEOF
interface ErrorContainer {
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email!',
    username: 'Must start with a capital character'
}

