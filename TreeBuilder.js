// function TreeBuilder(string, params) {
//     this.string = string;
//     this.params = params;

//     this.build = function () {
//         //init params
//         var state = {
//             bRadius: this.params.branchRadius,
//             bLength: this.params.branchLength,
//             bReduction: this.params.branchReduction,
//             bMinRadius: this.params.branchMinRadius,
//             position: new THREE.Vector3(0, 0, 0),
//             rotation: new THREE.Quaternion()
//         }
//         var stateStack = [];

//         //init object
//         var tree = new THREE.Object3D();
//         var textureLoader = new THREE.TextureLoader();
//         // var branchMaterial = new THREE.MeshBasicMaterial( {color: 'black'} );
//         // var appleMaterial = new THREE.MeshBasicMaterial( {color: 'red'} );
//         var branchMaterial = new THREE.MeshBasicMaterial({ color: 'brown', map: textureLoader.load("textures/branch.jpg") });
//         var appleMaterial = new THREE.MeshBasicMaterial({ color: 'red', map: textureLoader.load("textures/apple.jpg") });

//         for (var i = 0; i < this.string.length; i++) {
//             var char = this.string.charAt(i);
//             if (char == "F") {
//                 tree.add(buildBranch(state, branchMaterial));
//             }
//             if (char == "X") {
//                 tree.add(buildLeaf(state, appleMaterial));
//             }
//             if (char == "+") {
//                 state.rotation.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), this.params.delta * Math.PI / 180));
//             }
//             if (char == "-") {
//                 state.rotation.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -this.params.delta * Math.PI / 180));
//             }
//             if (char == "&") {
//                 state.rotation.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -this.params.delta * Math.PI / 180));
//             }
//             if (char == "^") {
//                 state.rotation.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.params.delta * Math.PI / 180));
//             }
//             if (char == "<") {
//                 state.rotation.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -this.params.delta * Math.PI / 180));
//             }
//             if (char == ">") {
//                 state.rotation.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), this.params.delta * Math.PI / 180));
//             }
//             if (char == "[") {
//                 stateStack.push(cloneState(state));
//                 state.bRadius = (state.bRadius - state.bReduction) > state.bMinRadius ? (state.bRadius - state.bReduction) : state.bRadius;
//             }
//             if (char == "]") {
//                 state = cloneState(stateStack.pop());
//             }

//         }
//         tree.castShadow = true;
//         return tree;
//     }

// }

// function buildBranch(state, material) {
//     var transform = new THREE.Quaternion();
//     transform.multiply(state.rotation);

//     var position = new THREE.Vector3(0.0, state.bLength / 2, 0.0);
//     position.applyQuaternion(state.rotation);
//     state.position.add(position);

//     var geometry = new THREE.CylinderBufferGeometry(state.bRadius, state.bRadius, state.bLength, 16);
//     var branch = new THREE.Mesh(geometry, material);
//     branch.quaternion.copy(state.rotation);
//     branch.position.copy(state.position);

//     state.position.add(position);
//     branch.castShadow = true;
//     return branch;

// }

// function buildLeaf(state, material) {
//     var transform = new THREE.Quaternion();
//     transform.multiply(state.rotation);

//     var originalPosition = new THREE.Vector3().copy(state.position);
//     var position = new THREE.Vector3(0, state.bLength / 8, 0.0);
//     position.applyQuaternion(state.rotation);
//     state.position.add(position);

//     var geometry = new THREE.SphereBufferGeometry(state.bLength / 4, 16);
//     var branch = new THREE.Mesh(geometry, material);
//     branch.quaternion.copy(state.rotation);
//     branch.position.copy(state.position);

//     state.position = new THREE.Vector3().copy(originalPosition);
//     branch.castShadow = true;
//     return branch;
// }

// function cloneState(state) {
//     return {
//         bRadius: state.bRadius,
//         bLength: state.bLength,
//         bReduction: state.bReduction,
//         bMinRadius: state.bMinRadius,
//         position: new THREE.Vector3().copy(state.position),
//         rotation: new THREE.Quaternion().copy(state.rotation)
//     }
// }


// function Params(axiom, iterations, delta, branchLength,
//     branchRadius, branchReduction, branchMinRadius) {
//     this.axiom = axiom ? axiom : "F";
//     this.iterations = iterations ? iterations : 4;
//     this.delta = delta ? delta : 25;
//     this.branchLength = branchLength ? branchLength : 3;
//     this.branchRadius = branchRadius ? branchRadius : 0.4;
//     this.branchReduction = branchReduction ? branchReduction : 0.1;
//     this.branchMinRadius = branchMinRadius ? branchMinRadius : 0.1;
// }


// function selectPreset() {
//     var preset = $("#preset").val();
//     if(preset == "Example A") {
//       params = new Params("F", 5, 20, 4, 0.2);
//       rules = "F=F[+F]F[-F][F]";
//     }
//     if(preset == "Example B") {
//       params = new Params("F", 5, 25.7, 5, 1, 0.2, 0.2);
//       rules = "F=F[+F]F[-F]F";
//     }
//     if(preset == "Example C") {
//       params = new Params("F", 4, 22.5, 4, 0.1);
//       rules = "F=FF-[-F+F+F]+[+F-F-F]";
//     }
//     if(preset == "Example D") {
//       params = new Params("X", 7, 20);
//       rules = "X=F[+X]F[-X]+X\nF=FF";
//     }
//     if(preset == "Example E") {
//       params = new Params("X", 7, 25.7);
//       rules = "X=F[+X][-X]FX\nF=FF";
//     }
//     if(preset == "Example F") {
//       params = new Params("X", 5, 22.5);
//       rules = "X=F-[[X]+X]+F[+FX]-X\nF=FF";
//     }
//     if(preset == "Example G") {
//       params = new Params("FFFFFA", 4, 25);
//       rules = "A=F[++A]X[--A]^^^A";
//     }
//     if(preset == "Example S") {
//       params = new Params("F", 5, 25, 3, 0.3);
//       rules = "F=F[+F]F[-F]F\nF=F[+F]F\nF=F[-F]F";
//     }
// }
