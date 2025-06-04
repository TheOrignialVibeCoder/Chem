import * as framerMotion from 'https://esm.run/framer-motion';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.theme-icon-sun');
    const moonIcon = document.querySelector('.theme-icon-moon');
    const htmlElement = document.documentElement;

    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (currentTheme === 'dark') {
        htmlElement.classList.add('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }

    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        const isDark = htmlElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        sunIcon.classList.toggle('hidden', isDark);
        moonIcon.classList.toggle('hidden', !isDark);
        lucide.createIcons(); 
    });

    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const appSections = document.querySelectorAll('.app-section');
    const logoLink = document.querySelector('header a[data-section]');

    function setActiveSection(sectionId) {
        appSections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.remove('hidden');
                if (framerMotion && framerMotion.animate) {
                    framerMotion.animate(section, { opacity: [0, 1], y: [10, 0] }, { duration: 0.5, ease: "easeOut" });
                }
            } else {
                section.classList.add('hidden');
            }
        });

        const allLinks = [...navLinks, ...mobileNavLinks, logoLink];
        allLinks.forEach(link => {
            if (link.dataset.section === sectionId) {
                link.classList.add('active-nav-link');
            } else {
                link.classList.remove('active-nav-link');
            }
        });
        
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
        lucide.createIcons();
    }
    
    [...navLinks, ...mobileNavLinks, logoLink].forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionId = link.dataset.section;
            setActiveSection(sectionId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    const inputTabs = document.querySelectorAll('.input-tab');
    const inputPanels = document.querySelectorAll('.input-panel');

    inputTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            inputTabs.forEach(t => {
                t.classList.remove('active-input-tab', 'text-indigo-600', 'dark:text-indigo-400', 'border-indigo-500', 'dark:border-indigo-400');
                t.classList.add('text-slate-500', 'hover:text-slate-700', 'dark:text-slate-400', 'dark:hover:text-slate-200', 'hover:border-slate-300', 'dark:hover:border-slate-500', 'border-transparent');
            });
            tab.classList.add('active-input-tab', 'text-indigo-600', 'dark:text-indigo-400', 'border-indigo-500', 'dark:border-indigo-400');
            tab.classList.remove('text-slate-500', 'hover:text-slate-700', 'dark:text-slate-400', 'dark:hover:text-slate-200', 'hover:border-slate-300', 'dark:hover:border-slate-500', 'border-transparent');
            
            const targetPanelId = (tab.textContent.trim().toLowerCase().includes('molecule editor')) ? 'molecule-editor-placeholder' : 'smiles-input-placeholder';

            inputPanels.forEach(panel => {
                if (panel.id === targetPanelId) {
                    panel.classList.remove('hidden');
                } else {
                    panel.classList.add('hidden');
                }
            });
        });
    });

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        lucide.createIcons(); 
    });

    document.getElementById('current-year').textContent = new Date().getFullYear();

    setActiveSection('reaction-solver-workspace'); 

    const useCurrentMoleculeBtn = document.getElementById('use-current-molecule-btn');
    if (useCurrentMoleculeBtn) {
        useCurrentMoleculeBtn.addEventListener('click', () => {
            console.log('UI: "Use Current Molecule from Editor" button clicked. Actual data transfer from Ketcher is not implemented in this step.');
            alert('This button implies the molecule drawn in the Ketcher editor will be used as input for the reaction prediction. Actual data transfer functionality is pending.');
        });
    }

    const predictReactionBtn = document.getElementById('predict-reaction-btn');
    if (predictReactionBtn) {
        predictReactionBtn.addEventListener('click', () => {
            console.log('UI: "Predict Reaction" button clicked. Actual prediction logic is not implemented in this step.');
            const temperatureInput = document.getElementById('temperature-input');
            const solventInput = document.getElementById('solvent-input');
            const catalystInput = document.getElementById('catalyst-input');

            const temperature = temperatureInput ? temperatureInput.value : 'N/A';
            const solvent = solventInput ? solventInput.value : 'N/A';
            const catalyst = catalystInput ? catalystInput.value : 'N/A';
            
            console.log('Reaction Parameters:', { temperature, solvent, catalyst });
            alert(`This button would initiate the reaction prediction with the following parameters (functionality pending):\nTemperature: ${temperature}\nSolvent: ${solvent}\nCatalyst/Reagents: ${catalyst}`);
            
        });
    }

    const viewFullStereochemistryBtn = document.getElementById('view-full-stereochemistry-btn');
    if (viewFullStereochemistryBtn) {
        viewFullStereochemistryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            setActiveSection('stereochemistry-viewer');
        });
    }

    const highlightAllChiralCentersBtn = document.getElementById('highlight-all-chiral-centers-btn');
    if (highlightAllChiralCentersBtn) {
        highlightAllChiralCentersBtn.addEventListener('click', () => {
            const centers = document.querySelectorAll('#chiral-centers-list-full li span');
            centers.forEach(span => {
                span.classList.toggle('bg-yellow-400');
                span.classList.toggle('border-slate-400');
                if(span.classList.contains('bg-yellow-400')) {
                    span.title = "Highlighted Chiral Center";
                } else {
                    span.title = "Chiral Center";
                }
            });
            console.log("Placeholder: Toggle all chiral center highlights.");
            alert("Placeholder: Highlighting all chiral centers. Visuals would update.");
        });
    }
    
    const stereo3DButtons = document.querySelectorAll('#stereochemistry-viewer .btn');
    stereo3DButtons.forEach(btn => {
        if (!btn.id || !btn.id.includes('highlight-all-chiral-centers-btn')) { 
             btn.addEventListener('click', () => {
                console.log(`Placeholder: Stereochemistry 3D control "${btn.textContent.trim()}" clicked.`);
                alert(`Placeholder functionality for "${btn.textContent.trim()}".`);
            });
        }
    });


    let workspaceCurrentStep = 1;
    const workspaceTotalSteps = 3;
    const workspaceMechanismPrevBtn = document.getElementById('workspace-mechanism-prev-btn');
    const workspaceMechanismNextBtn = document.getElementById('workspace-mechanism-next-btn');
    const workspaceStepIndicator = document.getElementById('workspace-mechanism-step-indicator');
    const workspaceStepDisplay = document.querySelector('#workspace-mechanism-step-display p:first-of-type');

    if (workspaceMechanismPrevBtn && workspaceMechanismNextBtn && workspaceStepIndicator && workspaceStepDisplay) {
        function updateWorkspaceMechanismStep() {
            workspaceStepIndicator.textContent = `Step ${workspaceCurrentStep} of ${workspaceTotalSteps}`;
            workspaceStepDisplay.textContent = `Step ${workspaceCurrentStep}: Action ${workspaceCurrentStep}`; 
        }
        workspaceMechanismPrevBtn.addEventListener('click', () => {
            if (workspaceCurrentStep > 1) {
                workspaceCurrentStep--;
                updateWorkspaceMechanismStep();
            }
        });
        workspaceMechanismNextBtn.addEventListener('click', () => {
            if (workspaceCurrentStep < workspaceTotalSteps) {
                workspaceCurrentStep++;
                updateWorkspaceMechanismStep();
            }
        });
        updateWorkspaceMechanismStep();
    }


    let animatorCurrentStep = 1;
    const animatorTotalSteps = 5;
    const animatorStepDescriptions = [
        "The nucleophile (e.g., an alcohol molecule) approaches and attacks the electrophilic carbonyl carbon...",
        "A proton transfer occurs, typically involving the solvent or another molecule, to neutralize the negatively charged oxygen...",
        "The leaving group departs, facilitated by protonation if it's a poor leaving group like -OH...",
        "A final deprotonation step occurs to regenerate a catalyst or yield the neutral product...",
        "The final product is formed. Reaction is complete."
    ];
    const animatorStepLabels = [
        "Nucleophilic Attack", "Proton Transfer", "Leaving Group Departure", "Deprotonation", "Product Formation"
    ];

    const animatorPrevBtn = document.getElementById('animator-prev-step-btn');
    const animatorNextBtn = document.getElementById('animator-next-step-btn');
    const animatorPlayPauseBtn = document.getElementById('animator-play-pause-btn');
    const animatorResetBtn = document.getElementById('animator-reset-btn');
    const animatorStepLabel = document.getElementById('mechanism-step-label-full');
    const animatorStepDescription = document.getElementById('animator-step-description');
    const animatorSpeedSlider = document.getElementById('animator-speed-slider');
    
    let isPlaying = false;
    let animationInterval;

    function updateAnimatorStepView() {
        if (!animatorStepLabel || !animatorStepDescription) return;
        animatorStepLabel.textContent = `Step ${animatorCurrentStep}: ${animatorStepLabels[animatorCurrentStep - 1]}`;
        animatorStepDescription.innerHTML = `<p>${animatorStepDescriptions[animatorCurrentStep - 1]}</p>`; 
        
        const iconInDisplay = document.querySelector('#mechanism-step-display-full i');
        if (iconInDisplay) { 
            const icons = ["microscope", "test-tube-2", "flask-conical", "atom", "check-circle"];
            iconInDisplay.dataset.lucide = icons[animatorCurrentStep -1] || "flask-conical";
            lucide.createIcons();
        }
    }

    function playAnimation() {
        if (animatorCurrentStep < animatorTotalSteps) {
            animatorCurrentStep++;
            updateAnimatorStepView();
        } else {
            pauseAnimation(); 
        }
    }

    function pauseAnimation() {
        isPlaying = false;
        clearInterval(animationInterval);
        if (animatorPlayPauseBtn) {
            animatorPlayPauseBtn.innerHTML = '<i data-lucide="play" class="h-5 w-5"></i><span class="hidden sm:inline ml-2">Play</span>';
            lucide.createIcons();
        }
    }
    
    if (animatorPrevBtn && animatorNextBtn && animatorPlayPauseBtn && animatorResetBtn && animatorStepLabel && animatorStepDescription && animatorSpeedSlider) {
        updateAnimatorStepView(); 

        animatorPrevBtn.addEventListener('click', () => {
            pauseAnimation();
            if (animatorCurrentStep > 1) {
                animatorCurrentStep--;
                updateAnimatorStepView();
            }
        });

        animatorNextBtn.addEventListener('click', () => {
            pauseAnimation();
            if (animatorCurrentStep < animatorTotalSteps) {
                animatorCurrentStep++;
                updateAnimatorStepView();
            }
        });

        animatorPlayPauseBtn.addEventListener('click', () => {
            if (isPlaying) {
                pauseAnimation();
            } else {
                if (animatorCurrentStep >= animatorTotalSteps) animatorCurrentStep = 1; 
                isPlaying = true;
                animatorPlayPauseBtn.innerHTML = '<i data-lucide="pause" class="h-5 w-5"></i><span class="hidden sm:inline ml-2">Pause</span>';
                lucide.createIcons();
                const speed = (1 / parseFloat(animatorSpeedSlider.value)) * 2000; 
                animationInterval = setInterval(playAnimation, speed);
            }
        });

        animatorResetBtn.addEventListener('click', () => {
            pauseAnimation();
            animatorCurrentStep = 1;
            updateAnimatorStepView();
        });

        animatorSpeedSlider.addEventListener('input', () => {
            if (isPlaying) {
                clearInterval(animationInterval);
                const speed = (1 / parseFloat(animatorSpeedSlider.value)) * 2000;
                animationInterval = setInterval(playAnimation, speed);
            }
            console.log(`Animation speed changed to: ${animatorSpeedSlider.value}x`);
        });
    }

    const shareReactionBtn = document.getElementById('share-reaction-btn');
    const shareModal = document.getElementById('share-modal');
    const closeShareModalBtn = document.getElementById('close-share-modal-btn');

    if (shareReactionBtn && shareModal && closeShareModalBtn) {
        shareReactionBtn.addEventListener('click', () => {
            shareModal.classList.remove('hidden');
            if (framerMotion && framerMotion.animate) {
                 framerMotion.animate(shareModal.querySelector('div'), { scale: [0.9, 1], opacity: [0, 1] }, { duration: 0.3 });
            }
            lucide.createIcons();
        });
        closeShareModalBtn.addEventListener('click', () => {
            shareModal.classList.add('hidden');
        });
        shareModal.addEventListener('click', (e) => {
            if (e.target === shareModal) {
                shareModal.classList.add('hidden');
            }
        });

        ['share-copy-link-btn', 'share-email-btn', 'share-export-btn'].forEach(id => {
            const btn = document.getElementById(id);
            if(btn) {
                btn.addEventListener('click', () => {
                    console.log(`Placeholder: "${btn.textContent.trim()}" clicked.`);
                    alert(`Placeholder functionality for "${btn.textContent.trim()}".`);
                });
            }
        });
    }

    const submitCommentBtn = document.getElementById('submit-comment-btn');
    const newCommentInput = document.getElementById('new-comment-input');
    const commentsDisplay = document.getElementById('comments-display');

    if (submitCommentBtn && newCommentInput && commentsDisplay) {
        submitCommentBtn.addEventListener('click', () => {
            const commentText = newCommentInput.value.trim();
            if (commentText) {
                console.log('New comment submitted:', commentText);
                alert(`Comment submitted (placeholder): "${commentText}"`);
                
                const commentDiv = document.createElement('div');
                commentDiv.className = 'text-sm p-2 border border-slate-200 dark:border-slate-600 rounded-md';
                commentDiv.innerHTML = `
                    <p class="font-medium text-slate-700 dark:text-slate-300">You:</p>
                    <p class="text-slate-600 dark:text-slate-400">${commentText.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
                `;
                commentsDisplay.appendChild(commentDiv);
                newCommentInput.value = '';
                commentsDisplay.scrollTop = commentsDisplay.scrollHeight;
            } else {
                alert('Please enter a comment.');
            }
        });
    }

    const spectroscopyTabs = document.querySelectorAll('.spectroscopy-tab');
    const spectroscopyPanels = document.querySelectorAll('.spectroscopy-panel');

    spectroscopyTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            spectroscopyTabs.forEach(t => {
                t.classList.remove('active-input-tab', 'text-indigo-600', 'dark:text-indigo-400', 'border-indigo-500', 'dark:border-indigo-400');
                t.classList.add('text-slate-500', 'hover:text-slate-700', 'dark:text-slate-400', 'dark:hover:text-slate-200', 'hover:border-slate-300', 'dark:hover:border-slate-500', 'border-transparent');
            });
            tab.classList.add('active-input-tab', 'text-indigo-600', 'dark:text-indigo-400', 'border-indigo-500', 'dark:border-indigo-400');
            tab.classList.remove('text-slate-500', 'hover:text-slate-700', 'dark:text-slate-400', 'dark:hover:text-slate-200', 'hover:border-slate-300', 'dark:hover:border-slate-500', 'border-transparent');
            
            const targetPanelId = tab.dataset.tab + '-content';
            spectroscopyPanels.forEach(panel => {
                if (panel.id === targetPanelId) {
                    panel.classList.remove('hidden');
                } else {
                    panel.classList.add('hidden');
                }
            });
            lucide.createIcons();
        });
    });
    
    const spectroscopyUseMoleculeBtn = document.getElementById('spectroscopy-use-molecule-btn');
    if (spectroscopyUseMoleculeBtn) {
        spectroscopyUseMoleculeBtn.addEventListener('click', () => {
            console.log('Spectroscopy: "Use Current Molecule from Editor" clicked. Placeholder.');
            alert('Placeholder: This would use the molecule from the editor for spectroscopy analysis.');
        });
    }

    const propertiesUseMoleculeBtn = document.getElementById('properties-use-molecule-btn');
    if (propertiesUseMoleculeBtn) {
        propertiesUseMoleculeBtn.addEventListener('click', () => {
            console.log('Molecular Properties: "Use Current Molecule from Editor" clicked. Placeholder.');
            alert('Placeholder: This would use the molecule from the editor for property calculation.');
        });
    }

    const calculatePropertiesBtn = document.getElementById('calculate-properties-btn');
    const propertyCheckboxes = document.querySelectorAll('#molecular-properties input[name="molecular_property"]');
    const calculatedPropertiesResults = document.getElementById('calculated-properties-results');

    if (calculatePropertiesBtn && propertyCheckboxes.length > 0 && calculatedPropertiesResults) {
        calculatePropertiesBtn.addEventListener('click', () => {
            const selectedProperties = [];
            propertyCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedProperties.push(checkbox.value);
                }
            });

            if (selectedProperties.length > 0) {
                console.log('Calculating properties:', selectedProperties);
                alert(`Placeholder: Calculating properties: ${selectedProperties.join(', ')}.`);
                
                let resultsHTML = '<h4 class="font-medium mb-2 text-slate-700 dark:text-slate-300">Mock Results:</h4><ul class="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">';
                selectedProperties.forEach(prop => {
                    resultsHTML += `<li>${prop.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: (Placeholder Value)</li>`;
                });
                resultsHTML += '</ul>';
                calculatedPropertiesResults.innerHTML = resultsHTML;

            } else {
                alert('Please select at least one property to calculate.');
                calculatedPropertiesResults.innerHTML = '<p class="text-slate-500 dark:text-slate-400 italic">Please select properties and click "Calculate".</p>';
            }
        });
    }
});
