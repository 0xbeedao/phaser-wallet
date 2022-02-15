import Phaser from 'phaser';

import roundButtons from './assets/buttons-round-200x201.png'
import flaresJson from './assets/particles/flares.json';
import flares from './assets/particles/flares.png';
import { connect } from './wallet';

const BUTTON_FRAMES = {
    INACTIVE: 8,
    CONNECTING: 4,
    CONNECTED: 6,
};

class WalletConnect extends Phaser.Scene {
    sprites = {};
    spriteFrames = { 'wallet': BUTTON_FRAMES.INACTIVE };
    provider = null;
    emitter = null;

    constructor() {
        super();
    }

    preload() {
        this.load.spritesheet('roundButtons', roundButtons, {
            frameWidth: 200,
            frameHeight: 201,
            endFrame: 9,
        });
        this.load.atlas('flares', flares, flaresJson);
    }

    create() {
        const { width } = this.game.config;
        const wallet = this.add.sprite(width - 100, 50, 'roundButtons', BUTTON_FRAMES.INACTIVE);
        wallet.setScale(0.35);
        this.makeWalletInteractive(wallet);
        this.sprites.wallet = wallet;
        const particles = this.add.particles('flares');
        const emitter = particles.createEmitter({
            frame: { frames: ['blue', 'yellow'], cycle: true },
            x: width - 100,
            y: 50,
            blendMode: 'ADD',
            scale: { start: 0.2, end: 0.1 },
            speed: { min: -100, max: 100 },
            emitZone: {
                source: new Phaser.Geom.Circle(0, 0, 35),
                type: 'edge',
                quantity: 50,
                yoyo: false,
            }
        });
        this.emitter = emitter;

    }

    makeWalletInteractive(wallet) {
        const hitArea = new Phaser.Geom.Circle(50, 50, 100);
        wallet.setInteractive(hitArea, Phaser.Geom.Circle.Contains);
        wallet.on('pointerover', this.onOver, this);
        wallet.on('pointerout', this.onOut, this);
        wallet.on('pointerdown', this.onClick, this);
    }

    async onClick(button) {
        if (this.connected) {
            console.log('disconnected');
            this.spriteFrames.wallet = BUTTON_FRAMES.INACTIVE;
            this.setSpriteFrame('wallet', false);
            this.connected = false;
            this.provider.disconnect();
            this.emitter.start();
            return;
        }
        console.log('connecting', button);
        this.sprites.wallet.removeInteractive();
        this.spriteFrames.wallet = BUTTON_FRAMES.CONNECTING;
        this.setSpriteFrame('wallet', false);
        const provider = await connect();
        console.log('connected', provider);
        if (provider) {
            this.spriteFrames.wallet = BUTTON_FRAMES.CONNECTED;
            this.connected = true;
            this.provider = provider;
        } else {
            this.connected = false;
            this.spriteFrames.wallet = BUTTON_FRAMES.INACTIVE;
        }
        this.setSpriteFrame('wallet', false);
        this.emitter.explode();
        this.makeWalletInteractive(this.sprites.wallet);
    }

    onOver(button) {
        this.setSpriteFrame('wallet', true);
        console.log('over', button);
    }

    onOut(button) {
        this.setSpriteFrame('wallet', false);
        console.log('out', button);
    }

    setSpriteFrame(key, hover) {
        const index = this.spriteFrames[key] + (hover ? 1 : 0);
        this.sprites[key].setFrame(index);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: WalletConnect,
};

const game = new Phaser.Game(config);
