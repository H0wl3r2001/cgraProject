import {CGFobject, CGFscene} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyDiamond extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			//positive z face
			-1,	0,	0,	//0
			0,	-1,	0,	//1
			0,	1,	0,	//2
			1,	0,	0,	//3
			//negative z face
			1,	0,	0,	//4
			0,	-1,	0,	//5
			-1,	0,	0,	//6
			0,	1,	0	//8

		];

		//Counter-clockwise reference of vertices
		this.indices = [
			//positive z face
			0,	1,	2,
			1,	3,	2,
			//negative z face
			4,	5,	6,
			6,	7,	4
		];

		this.normals = [
			//positive z normals
			0,	0,	1,
			0,	0,	1,
			0,	0,	1,
			0,	0,	1,
			//negative z normals
			0,	0,	-1,
			0,	0,	-1,
			0,	0,	-1,
			0,	0,	-1
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

