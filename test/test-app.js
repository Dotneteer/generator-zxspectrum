'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

// --- Constants used during the generation process
const PRJ_FOLDER = 'ZxSpectrum';
const SETTINGS_FOLDER = '.zxspectrum';
const ANN_FOLDER = 'annotations';
const SRC_FOLDER = 'src';
const TAPE_FOLDER = 'tape';
const FLOPPY_FOLDER = 'floppy';
const SPCONF_FILE = 'spconf.json';
const ANN_FILE = 'annotations.disann';
const CODE_FILE = 'code.z80asm';
const TAPE_FILE = 'welcome.tzx';
const FLOPPY_FILE = 'floppy.vfdd';

describe('ZX Spectrum 48 Project Generator', () => {
    before((done) => {
        helpers.run(path.join(__dirname, '../app'))
            .withArguments([PRJ_FOLDER, '48'])
            .withOptions({
                skipInstall: true,
                git: false
            })
            .on('end', done);
    });

    it('Spectrum 48 files generated', () => {
        assert.file([
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/${SPCONF_FILE}`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrum48.rom`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrum48.disann`,
            `${PRJ_FOLDER}/${TAPE_FOLDER}/${TAPE_FILE}`,
            `${PRJ_FOLDER}/${SRC_FOLDER}/${CODE_FILE}`,
            `${PRJ_FOLDER}/${ANN_FOLDER}/${ANN_FILE}`
        ]);
    });
});

describe('ZX Spectrum 128 Project Generator', () => {
    before((done) => {
        helpers.run(path.join(__dirname, '../app'))
            .withArguments([PRJ_FOLDER, '128'])
            .withOptions({
                skipInstall: true,
                git: false
            })
            .on('end', done);
    });

    it('Spectrum 128 files generated', () => {
        assert.file([
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/${SPCONF_FILE}`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrum128-0.rom`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrum128-0.disann`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrum128-1.rom`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrum128-1.disann`,
            `${PRJ_FOLDER}/${TAPE_FOLDER}/${TAPE_FILE}`,
            `${PRJ_FOLDER}/${SRC_FOLDER}/${CODE_FILE}`,
            `${PRJ_FOLDER}/${ANN_FOLDER}/${ANN_FILE}`
        ]);
    });
});

describe('ZX Spectrum +2A Project Generator', () => {
    before((done) => {
        helpers.run(path.join(__dirname, '../app'))
            .withArguments([PRJ_FOLDER, '+2A'])
            .withOptions({
                skipInstall: true,
                git: false
            })
            .on('end', done);
    });

    it('Spectrum +2A files generated', () => {
        assert.file([
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/${SPCONF_FILE}`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-0.rom`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-0.disann`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-1.rom`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-1.disann`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-2.rom`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-2.disann`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-3.rom`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-3.disann`,
            `${PRJ_FOLDER}/${TAPE_FOLDER}/${TAPE_FILE}`,
            `${PRJ_FOLDER}/${SRC_FOLDER}/${CODE_FILE}`,
            `${PRJ_FOLDER}/${ANN_FOLDER}/${ANN_FILE}`
        ]);
    });
});

describe('ZX Spectrum +3, single floppy Project Generator', () => {
    before((done) => {
        helpers.run(path.join(__dirname, '../app'))
            .withArguments([PRJ_FOLDER, '+3F1'])
            .withOptions({
                skipInstall: true,
                git: false
            })
            .on('end', done);
    });

    it('Spectrum +3 files generated', () => {
        assert.file([
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/${SPCONF_FILE}`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-0.rom`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-0.disann`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-1.rom`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-1.disann`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-2.rom`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-2.disann`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-3.rom`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-3.disann`,
            `${PRJ_FOLDER}/${TAPE_FOLDER}/${TAPE_FILE}`,
            `${PRJ_FOLDER}/${SRC_FOLDER}/${CODE_FILE}`,
            `${PRJ_FOLDER}/${ANN_FOLDER}/${ANN_FILE}`,
            `${PRJ_FOLDER}/${FLOPPY_FOLDER}/${FLOPPY_FILE}`
        ]);
    });
});

describe('ZX Spectrum +3, double floppy Project Generator', () => {
    before((done) => {
        helpers.run(path.join(__dirname, '../app'))
            .withArguments([PRJ_FOLDER, '+3F2'])
            .withOptions({
                skipInstall: true,
                git: false
            })
            .on('end', done);
    });

    it('Spectrum +3 files generated', () => {
        assert.file([
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/${SPCONF_FILE}`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-0.rom`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-0.disann`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-1.rom`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-1.disann`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-2.rom`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-2.disann`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-3.rom`,
            `${PRJ_FOLDER}/${SETTINGS_FOLDER}/ZXSpectrumP3E-3.disann`,
            `${PRJ_FOLDER}/${TAPE_FOLDER}/${TAPE_FILE}`,
            `${PRJ_FOLDER}/${SRC_FOLDER}/${CODE_FILE}`,
            `${PRJ_FOLDER}/${ANN_FOLDER}/${ANN_FILE}`,
            `${PRJ_FOLDER}/${FLOPPY_FOLDER}/${FLOPPY_FILE}`
        ]);
    });
});

