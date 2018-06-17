"use strict";

var Generator = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _ = require('lodash');

var acceptedProjectTypes = [
    { name: 'Spectrum 48K', value: '48' },
    { name: 'Spectrum 48K, NTSC', value: '48NTSC' },
    { name: 'Spectrum 128K', value: '128' },
    { name: 'Spectrum +2A', value: '+2A' },
    { name: 'Spectrum +3E', value: '+3F1' },
    { name: 'Spectrum +3E, double FDD', value: '+3F2' }
];

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    
        this.argument('projectName', { 
            type: String, 
            required: false,
            description: 'The name of the folder in which the ZX Spectrum project is generated'
        });
        this.argument('spectrumType', {
            type: String,
            required: false,
            description: 'The type of ZX Spectrum virtual machine this project uses'
        });
    }

    initializing() {
        this.log(yosay('Welcome to ' +
            chalk.green('SpectNetVsc') + ' ZX Spectrum project generator!'));
    }

    prompting() {
        var generator = this;
        var projectNameSpecified = this.args && this.args.length > 0 && this.args[0];
        var spectrumTypeSpecified = this.args && this.args.length > 1 
            && this.args[1] 
            && _.includes(acceptedProjectTypes.map(a => a.value), this.args[1].toString().toUpperCase())

        return this.prompt([{
                when: function() { return !projectNameSpecified },
                type: 'input',
                name: 'projectName',
                message: 'Project name',
                default: 'ZxSpectrum'
            }, {
                when: function() { return !spectrumTypeSpecified },
                type: 'list',
                name: 'spectrumType',
                message: 'What type of extension do you want to create?',
                choices: acceptedProjectTypes
            }])
            .then(function (answers) {
                generator.projectName = projectNameSpecified
                    ? generator.args[0].toString()
                    : answers.projectName;

                generator.spectrumType = spectrumTypeSpecified
                    ? generator.args[1].toString().toUpperCase()
                    : answers.spectrumType;
            });
        }

    configuring() {
        this.log("configuring");
    }

    writing() {
        this._staticFiles();
    }

    conflicts() {
        this.log("conflicts");
    }

    install() {
        this.log("Project name: " + this.projectName);
        this.log("Spectrum type: " + this.spectrumType);
    }

    end() {
        this.log("end");
    }

    _staticFiles() {
        this.fs.copy(this.templatePath('_sample.z80asm'), 
            this.destinationPath('src/sample.z80asm'));
    }
}