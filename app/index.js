"use strict";

const Generator = require('yeoman-generator');
const yosay = require('yosay');
const chalk = require('chalk');
const _ = require('lodash');

// --- The user can choose from these machine types
const acceptedProjectTypes = [
    { name: 'Spectrum 48K', value: '48', model: 'ZX Spectrum 48K', edition: 'PAL' },
    { name: 'Spectrum 48K, NTSC', value: '48NTSC', model: 'ZX Spectrum 48K', edition: 'NTSC' },
    { name: 'Spectrum 128K', value: '128', model: 'ZX Spectrum 128K', edition: 'PAL'},
    { name: 'Spectrum +2A', value: '+2A', model: 'ZX Spectrum +3E', edition: 'PAL' },
    { name: 'Spectrum +3E', value: '+3F1', model: 'ZX Spectrum +3E', edition: 'FLOPPY1' },
    { name: 'Spectrum +3E, double FDD', value: '+3F2', model: 'ZX Spectrum +3E', edition: 'FLOPPY2' }
];

// --- The ROM folders for a specific ZX Spectrum type
const romFolders = [
    { key: '48', folder: 'ZXSpectrum48', roms: 1, floppy: false },
    { key: '48NTSC', folder: 'ZXSpectrum48', roms: 1, floppy: false },
    { key: '128', folder: 'ZXSpectrum128', roms: 2, floppy: false },
    { key: '+2A', folder: 'ZXSpectrumP3E', roms: 4, floppy: false },
    { key: '+3F1', folder: 'ZXSpectrumP3E', roms: 4, floppy: true },
    { key: '+3F2', folder: 'ZXSpectrumP3E', roms: 4, floppy: true },
];

// --- Constants used during the generation process
const SETTINGS_FOLDER = '.zxspectrum';
const ROMS_FOLDER = 'roms';
const ANN_FOLDER = 'annotations';
const SRC_FOLDER = 'src';
const TAPE_FOLDER = 'tape';
const FLOPPY_FOLDER = 'floppy';
const SPCONF_FILE = 'spconf.json';
const ANN_FILE = 'annotations.disann';
const CODE_FILE = 'code.z80asm';
const TAPE_FILE = 'welcome.tzx';
const FLOPPY_FILE = 'floppy.vfdd';
const ROM_EXT = '.rom';
const DISANN_EXT = '.disann';

// --- The ZX Spectrum generator
module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    
        // --- Optinal project name
        this.argument('projectName', { 
            type: String, 
            required: false,
            description: 'The name of the folder in which the ZX Spectrum project is generated'
        });

        // --- Optional spectrum type name
        this.argument('spectrumType', {
            type: String,
            required: false,
            description: 'The type of ZX Spectrum virtual machine this project uses'
        });

        this.option('git', {
            type: Boolean,
            required: false,
            description: 'Signs that a Git repository should be created for this project'
        });
    }

    // --- Displays the generator message
    initializing() {
        this.log(yosay('Welcome to ' +
            chalk.green('SpectNetVsc') + ' ZX Spectrum project generator!'));
    }

    // --- Promt for those arguments (project name, ZX Spectrum type, git init)
    // --- that has not been provided
    prompting() {
        var generator = this;
        var projectNameSpecified = this.args && this.args.length > 0 && this.args[0];
        var spectrumTypeSpecified = this.args && this.args.length > 1 
            && this.args[1] 
            && _.includes(acceptedProjectTypes.map(a => a.value), this.args[1].toString().toUpperCase())
        var gitSpecified = this.options.git !== undefined;

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
            }, {
                when: function() { return !gitSpecified },
                type: 'confirm',
                name: 'gitInit',
                message: 'Initialize a git repository?',
                default: true
            }])
            .then(function (answers) {
                generator.projectName = projectNameSpecified
                    ? generator.args[0].toString()
                    : answers.projectName;

                generator.spectrumType = spectrumTypeSpecified
                    ? generator.args[1].toString().toUpperCase()
                    : answers.spectrumType;

                generator.gitInit = gitSpecified
                    ? generator.options.git
                    : answers.gitInit;
            });
        }

    // --- Writes project files into the project directory
    writing() {
        this._spConfFile();
        this._romFiles();
        this._annotationFile();
        this._tapeFile();
        this._codeFile();
        this._floppyFile();
    }

    // --- Carries out optional Git initialization
    end() {
        // --- Git init
        if (this.gitInit) {
            this.spawnCommand('git', ['init', '--quiet', this.projectName]);
        }

        this.log();
        this.log('Use Visual Studio Code with the '
            + chalk.green('SpectNetVsc') + ' extension to develop ZX Spectrum applications.');
        this.log('For more details, check '
            + chalk.blue('https://github.com/Dotneteer/spectnetvsc') + '.');
    }

    // --- Creates the ZX Spectrum configuration file
    _spConfFile() {
        const filename = `${this.projectName}/${SETTINGS_FOLDER}/${SPCONF_FILE}`;
        const item = _.find(acceptedProjectTypes, i=> i.value === this.spectrumType);
        this.fs.writeJSON(filename, {
            model: item.model,
            edition: item.edition
        });
    }

    // --- Copies the ZX Spectrum ROM files
    _romFiles() {
        const foldername = `${this.projectName}/${SETTINGS_FOLDER}`;
        const item = _.find(romFolders, i=> i.key === this.spectrumType);
        for (let i = 0; i < item.roms; i++) {
            const romfile = item.roms === 1
                ? item.folder
                : `${item.folder}-${i}`;
            
                // --- Copy each ROM file
            this.fs.copy(
                this.templatePath(`${ROMS_FOLDER}/${item.folder}/${romfile}${ROM_EXT}`),
                this.destinationPath(`${foldername}/${romfile}${ROM_EXT}`)
            );
            
                // --- Copy each annotation file
            this.fs.copy(
                this.templatePath(`${ROMS_FOLDER}/${item.folder}/${romfile}${DISANN_EXT}`),
                this.destinationPath(`${foldername}/${romfile}${DISANN_EXT}`)
            );
        }
    }

    // --- Copies the default custom annotation file
    _annotationFile() {
        this.fs.copy(
            this.templatePath(ANN_FILE),
            this.destinationPath(`${this.projectName}/${ANN_FOLDER}/${ANN_FILE}`)
        );
    }

    // --- Copies the default Z80 code file
    _codeFile() {
        this.fs.copy(
            this.templatePath(CODE_FILE),
            this.destinationPath(`${this.projectName}/${SRC_FOLDER}/${CODE_FILE}`)
        );
    }

    // --- Copies the sample tape file
    _tapeFile() {
        this.fs.copy(
            this.templatePath(TAPE_FILE),
            this.destinationPath(`${this.projectName}/${TAPE_FOLDER}/${TAPE_FILE}`)
        );
    }

    // --- Copies the sample floppy file
    _floppyFile() {
        const item = _.find(romFolders, i=> i.key === this.spectrumType);
        if (item.floppy) {
            this.fs.copy(
                this.templatePath(FLOPPY_FILE),
                this.destinationPath(`${this.projectName}/${FLOPPY_FOLDER}/${FLOPPY_FILE}`)
            );
        }
    }
}