import { Component } from "react"
import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// GLOBALS
let pointer = new THREE.Vector2()
const raycaster = new THREE.Raycaster();

class Animation extends Component {

    componentDidMount() {

        // Key modes 
        let size = 4  // Diameter of main (land) layer (used for sizing other objects)
        const qual = this.props.qual  // Quality of images uploaded'
        const mode = this.props.mode  // Visualisation for the main (land) layer
        const allVisuals = [
            "bluemarble", // land regions (vegetation)
            "poplights",  // mix of population density and night ligts
            "popdensity" // population density
        ]

        const vis = mode === "default"
            ? "bluemarble"
            : allVisuals[Math.floor(Math.random() * allVisuals.length)]

        // IMAGES TO BE USED THROUGHOUT
        // Land surface
        // - (Adapted from) NASA Goddard Space Flight Center Image by Reto Stöckli (land surface, shallow water, clouds). Enhancements by Robert Simmon (ocean color, compositing, 3D globes, animation). Data and technical support: MODIS Land Group; MODIS Science Data Support Team; MODIS Atmosphere Group; MODIS Ocean Group Additional data: USGS EROS Data Center (topography); USGS Terrestrial Remote Sensing Flagstaff Field Center (Antarctica); Defense Meteorological Satellite Program (city lights).
        // - Available from: https://visibleearth.nasa.gov/images/57730/the-blue-marble-land-surface-ocean-color-and-sea-ice/82679l
        // - License: public domain (https://visibleearth.nasa.gov/image-use-policy)
        const landImage = qual === "high"
            ? `/animation/${vis}-${qual}.png`
            : `/animation/${vis}-${qual}.webp`

        // Land topography
        // - Imagery by Jesse Allen, NASA's Earth Observatory, using data from the General Bathymetric Chart of the Oceans (GEBCO) produced by the British Oceanographic Data Centre.
        // - Available from: https://visibleearth.nasa.gov/images/73934/topography/84331l
        // - License: public domain (https://neo.gsfc.nasa.gov/about/)
        const topoImage = `/animation/topography-${qual}.png`

        // Oceans bathymetry (topography of the seas).
        // - 
        // - Available from: https://neo.gsfc.nasa.gov/view.php?datasetId=GEBCO_BATHY
        // - License: public domain (https://visibleearth.nasa.gov/image-use-policy)
        const bathyImage = qual === "high"
            ? `/animation/bathymetry-${qual}.jpg`
            : `/animation/bathymetry-${qual}.webp`

        // Clouds surface
        // NASA Goddard Space Flight Center Image by Reto Stöckli (land surface, shallow water, clouds). Enhancements by Robert Simmon (ocean color, compositing, 3D globes, animation). Data and technical support: MODIS Land Group; MODIS Science Data Support Team; MODIS Atmosphere Group; MODIS Ocean Group Additional data: USGS EROS Data Center (topography); USGS Terrestrial Remote Sensing Flagstaff Field Center (Antarctica); Defense Meteorological Satellite Program (city lights)
        // Images from: https://visibleearth.nasa.gov/images/57747/blue-marble-clouds/57749l
        // License: public domain (https://visibleearth.nasa.gov/image-use-policy)
        const cloudImage = qual === "low"
            ? `/animation/clouds-${qual}.webp`
            : `/animation/clouds-${qual}.jpg`

        // Credits for other images used in the main (land) layer
        // From: NASA Earth Observatory (NEO)
        // Population density: https://neo.gsfc.nasa.gov/view.php?datasetId=SEDAC_POP
        // Ave. land surface temp (day): https://neo.gsfc.nasa.gov/view.php?datasetId=MOD_LSTD_CLIM_M
        // License: public domain (https://neo.gsfc.nasa.gov/about/)
        //
        // From: NASA Scientific visualisation studio 
        // Freshwater: https://svs.gsfc.nasa.gov/12950#media_group_325744
        // Blackmarble: https://www.visibleearth.nasa.gov/images/144898/earth-at-night-black-marble-2016-color-maps


        // SET THE SCENE, CAMERA, & RENDERER
        const scene = new THREE.Scene()
        const cam = new THREE.PerspectiveCamera(75, this.mount.offsetWidth / this.mount.offsetHeight, 0.1, 1000)
        cam.position.z = 10

        const renderer = new THREE.WebGLRenderer({ alpha: true })
        renderer.setSize(this.mount.offsetWidth, this.mount.offsetHeight)
        renderer.setPixelRatio(window.devicePixelRatio);
        this.mount.appendChild(renderer.domElement)

        // SET CONTROLS
        const controls = new OrbitControls(cam, renderer.domElement);
        controls.target = new THREE.Vector3(0, 0, 0);
        controls.update();

        // ADD LIGHTING
        const white = "0xffffff"
        const ambient = new THREE.AmbientLight("0xffffff", 0.1);
        const hemi = new THREE.HemisphereLight(white, 1);
        hemi.position.set(10, 10, 0);
        scene.add(ambient, hemi)

        // DEFINE BASIC GEOMETRIES AND MATERIALS
        const landText = new THREE.TextureLoader().load(landImage);
        const topoText = new THREE.TextureLoader().load(topoImage);
        const bathyText = new THREE.TextureLoader().load(bathyImage);
        const cloudText = new THREE.TextureLoader().load(cloudImage);

        // CONSTRUCT & POSITION OBJECTS

        // Water
        const waterGeo = new THREE.SphereGeometry(size - 0.1, 32, 32)
        const waterMat = new THREE.MeshStandardMaterial({
            map: bathyText,
            bumpMap: bathyText,
            bumpScale: 10,
        })
        let waterObj = new THREE.Mesh(waterGeo, waterMat)
        waterObj.position.set(0, 0, 0)
        scene.add(waterObj)

        // Land
        const landGeo = new THREE.SphereGeometry(size, 32, 32)
        const landMat = new THREE.MeshStandardMaterial({
            map: landText,
            bumpMap: topoText,
            bumpScale: qual === 'low' ? 100 : 1000,
            transparent: true,
            side: THREE.DoubleSide,
        })
        let landObj = new THREE.Mesh(landGeo, landMat)
        landObj.position.set(0, 0, 0)
        scene.add(landObj);

        // Clouds
        const cloudsGeo = new THREE.SphereGeometry(size + 0.5, 32, 32)
        const cloudsMat = new THREE.MeshStandardMaterial({
            alphaMap: cloudText,
            transparent: true,
            depthWrite: false,
        })
        let cloudsObj = new THREE.Mesh(cloudsGeo, cloudsMat)
        cloudsObj.position.set(0, 0, 0)
        scene.add(cloudsObj);


        // BRING SCENE TO LIFE
        this.animate = () => {
            requestAnimationFrame(this.animate.bind(this))
            scene.rotation.y += 0.001
            renderer.render(scene, cam)
        }
        this.animate()


        // FUNCTION TO DO STUFF ON HOVER
        this.hoverSituation = () => {
            raycaster.setFromCamera(pointer, cam)
            const intersects = raycaster.intersectObjects(scene.children)
            if (intersects.length >= 1) {
                for (let i = 0; i < intersects.length; i++) {
                    console.log("function goes here")
                }
            }
        }

        // FUNCTION TO DO STUFF ON CLICK
        this.clickSituation = () => {
            // Reset all nodes first
            for (let i = 0; i < scene.children.length; i++) {
                if (scene.children[i].material) {
                    scene.children[i].scale.set(1, 1, 1);
                }
            }

            // Scale any node being clicked
            raycaster.setFromCamera(pointer, cam)
            const intersects = raycaster.intersectObjects(scene.children)
            if (intersects.length >= 1) {
                for (let i = 0; i < intersects.length; i++) {
                    if (intersects[i].object.type === "Mesh") {
                        intersects[i].object.scale.set(1.5, 1.5, 1.5)
                    }
                }
            }
        }

        // ADD LISTENERS
        document.addEventListener('pointermove', this.onPointerMove.bind(this), false)
        document.addEventListener('pointerdown', this.onPointerDown.bind(this), false)
        window.addEventListener('resize', this.onWindowResize.bind(this), false)

    }


    // FUNCTION TO GET POINTER COORDINATES AS IT MOVES (FOR HOVER)
    onPointerMove(event) {
        this.hoverSituation()
        if (this.mount) {
            pointer.x = (event.clientX / this.mount.offsetWidth) * 2 - 1
            pointer.y = - (event.clientY / this.mount.offsetHeight) * 2 + 1
            return pointer
        }
    }


    // FUNCTION TO GET POINTER COORDINATES UPON CLICK
    onPointerDown(event) {
        this.clickSituation()
        if (this.mount) {
            pointer.x = (event.clientX / this.mount.offsetWidth) * 2 - 1
            pointer.y = - (event.clientY / this.mount.offsetHeight) * 2 + 1
            return pointer
        }
    }


    // FUNCTION TO HANDLE RESIZES
    onWindowResize() {
        if (this.mount) {
            cam.aspect = this.mount.offsetWidth / this.mount.offsetHeight
            cam.updateProjectionMatrix()
            renderer.setSize(this.mount.offsetWidth, this.mount.offsetHeight)
        }
    }


    // FINALLY !!!
    // RENDER THE SCENE
    render() {
        return (
            <div
                ref={ref => (this.mount = ref)}
                style={{ width: this.props.canvasWidth, height: this.props.canvasHeight }}>
            </div>

        )
    }
}

export default Animation