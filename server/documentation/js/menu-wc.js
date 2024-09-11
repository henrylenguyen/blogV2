'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">server documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CarouselsModule.html" data-type="entity-link" >CarouselsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CarouselsModule-8fcfe1934804ecbba8408f395780e1b2a2b75070b18da524a850e75b5745ff7bad0c3987efc22d040403caa41ba1a6b294d620a49d8f8839094261de8878c184"' : 'data-bs-target="#xs-controllers-links-module-CarouselsModule-8fcfe1934804ecbba8408f395780e1b2a2b75070b18da524a850e75b5745ff7bad0c3987efc22d040403caa41ba1a6b294d620a49d8f8839094261de8878c184"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CarouselsModule-8fcfe1934804ecbba8408f395780e1b2a2b75070b18da524a850e75b5745ff7bad0c3987efc22d040403caa41ba1a6b294d620a49d8f8839094261de8878c184"' :
                                            'id="xs-controllers-links-module-CarouselsModule-8fcfe1934804ecbba8408f395780e1b2a2b75070b18da524a850e75b5745ff7bad0c3987efc22d040403caa41ba1a6b294d620a49d8f8839094261de8878c184"' }>
                                            <li class="link">
                                                <a href="controllers/CarouselsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarouselsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CarouselsModule-8fcfe1934804ecbba8408f395780e1b2a2b75070b18da524a850e75b5745ff7bad0c3987efc22d040403caa41ba1a6b294d620a49d8f8839094261de8878c184"' : 'data-bs-target="#xs-injectables-links-module-CarouselsModule-8fcfe1934804ecbba8408f395780e1b2a2b75070b18da524a850e75b5745ff7bad0c3987efc22d040403caa41ba1a6b294d620a49d8f8839094261de8878c184"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CarouselsModule-8fcfe1934804ecbba8408f395780e1b2a2b75070b18da524a850e75b5745ff7bad0c3987efc22d040403caa41ba1a6b294d620a49d8f8839094261de8878c184"' :
                                        'id="xs-injectables-links-module-CarouselsModule-8fcfe1934804ecbba8408f395780e1b2a2b75070b18da524a850e75b5745ff7bad0c3987efc22d040403caa41ba1a6b294d620a49d8f8839094261de8878c184"' }>
                                        <li class="link">
                                            <a href="injectables/CarouselsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarouselsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharepointModule.html" data-type="entity-link" >SharepointModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SharepointModule-cdfd28b94873df294e8164136b8598ee8c4311c9858d975745c57c79fd4ca7266da201bc61927816d8e35b373cd4e0adece14a7a5178e10570548cbd89a7c653"' : 'data-bs-target="#xs-controllers-links-module-SharepointModule-cdfd28b94873df294e8164136b8598ee8c4311c9858d975745c57c79fd4ca7266da201bc61927816d8e35b373cd4e0adece14a7a5178e10570548cbd89a7c653"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SharepointModule-cdfd28b94873df294e8164136b8598ee8c4311c9858d975745c57c79fd4ca7266da201bc61927816d8e35b373cd4e0adece14a7a5178e10570548cbd89a7c653"' :
                                            'id="xs-controllers-links-module-SharepointModule-cdfd28b94873df294e8164136b8598ee8c4311c9858d975745c57c79fd4ca7266da201bc61927816d8e35b373cd4e0adece14a7a5178e10570548cbd89a7c653"' }>
                                            <li class="link">
                                                <a href="controllers/SharepointController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SharepointController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UploadController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SharepointModule-cdfd28b94873df294e8164136b8598ee8c4311c9858d975745c57c79fd4ca7266da201bc61927816d8e35b373cd4e0adece14a7a5178e10570548cbd89a7c653"' : 'data-bs-target="#xs-injectables-links-module-SharepointModule-cdfd28b94873df294e8164136b8598ee8c4311c9858d975745c57c79fd4ca7266da201bc61927816d8e35b373cd4e0adece14a7a5178e10570548cbd89a7c653"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharepointModule-cdfd28b94873df294e8164136b8598ee8c4311c9858d975745c57c79fd4ca7266da201bc61927816d8e35b373cd4e0adece14a7a5178e10570548cbd89a7c653"' :
                                        'id="xs-injectables-links-module-SharepointModule-cdfd28b94873df294e8164136b8598ee8c4311c9858d975745c57c79fd4ca7266da201bc61927816d8e35b373cd4e0adece14a7a5178e10570548cbd89a7c653"' }>
                                        <li class="link">
                                            <a href="injectables/SharepointService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SharepointService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TelegramModule.html" data-type="entity-link" >TelegramModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TelegramModule-68055d232671c5e7d0cbd7803813995bbd1b394f154aabbdf32125f1bfdb9dba4256a58a3221d6a6c8fb91f56e269cc142edba90a9f248e69b443d1c6b18e3c2"' : 'data-bs-target="#xs-controllers-links-module-TelegramModule-68055d232671c5e7d0cbd7803813995bbd1b394f154aabbdf32125f1bfdb9dba4256a58a3221d6a6c8fb91f56e269cc142edba90a9f248e69b443d1c6b18e3c2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TelegramModule-68055d232671c5e7d0cbd7803813995bbd1b394f154aabbdf32125f1bfdb9dba4256a58a3221d6a6c8fb91f56e269cc142edba90a9f248e69b443d1c6b18e3c2"' :
                                            'id="xs-controllers-links-module-TelegramModule-68055d232671c5e7d0cbd7803813995bbd1b394f154aabbdf32125f1bfdb9dba4256a58a3221d6a6c8fb91f56e269cc142edba90a9f248e69b443d1c6b18e3c2"' }>
                                            <li class="link">
                                                <a href="controllers/TelegramController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TelegramController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TelegramModule-68055d232671c5e7d0cbd7803813995bbd1b394f154aabbdf32125f1bfdb9dba4256a58a3221d6a6c8fb91f56e269cc142edba90a9f248e69b443d1c6b18e3c2"' : 'data-bs-target="#xs-injectables-links-module-TelegramModule-68055d232671c5e7d0cbd7803813995bbd1b394f154aabbdf32125f1bfdb9dba4256a58a3221d6a6c8fb91f56e269cc142edba90a9f248e69b443d1c6b18e3c2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TelegramModule-68055d232671c5e7d0cbd7803813995bbd1b394f154aabbdf32125f1bfdb9dba4256a58a3221d6a6c8fb91f56e269cc142edba90a9f248e69b443d1c6b18e3c2"' :
                                        'id="xs-injectables-links-module-TelegramModule-68055d232671c5e7d0cbd7803813995bbd1b394f154aabbdf32125f1bfdb9dba4256a58a3221d6a6c8fb91f56e269cc142edba90a9f248e69b443d1c6b18e3c2"' }>
                                        <li class="link">
                                            <a href="injectables/TelegramService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TelegramService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UploadModule.html" data-type="entity-link" >UploadModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UploadModule-cbca01376dbb28dfcebd45d2bc47d2307d266ef0af864643b5769ae2bc2e81a98fb48b815a5139e09ebb29cbd1a7d90c2c8013dac558ecba6e54b419c43e8025"' : 'data-bs-target="#xs-controllers-links-module-UploadModule-cbca01376dbb28dfcebd45d2bc47d2307d266ef0af864643b5769ae2bc2e81a98fb48b815a5139e09ebb29cbd1a7d90c2c8013dac558ecba6e54b419c43e8025"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UploadModule-cbca01376dbb28dfcebd45d2bc47d2307d266ef0af864643b5769ae2bc2e81a98fb48b815a5139e09ebb29cbd1a7d90c2c8013dac558ecba6e54b419c43e8025"' :
                                            'id="xs-controllers-links-module-UploadModule-cbca01376dbb28dfcebd45d2bc47d2307d266ef0af864643b5769ae2bc2e81a98fb48b815a5139e09ebb29cbd1a7d90c2c8013dac558ecba6e54b419c43e8025"' }>
                                            <li class="link">
                                                <a href="controllers/UploadController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UploadModule-cbca01376dbb28dfcebd45d2bc47d2307d266ef0af864643b5769ae2bc2e81a98fb48b815a5139e09ebb29cbd1a7d90c2c8013dac558ecba6e54b419c43e8025"' : 'data-bs-target="#xs-injectables-links-module-UploadModule-cbca01376dbb28dfcebd45d2bc47d2307d266ef0af864643b5769ae2bc2e81a98fb48b815a5139e09ebb29cbd1a7d90c2c8013dac558ecba6e54b419c43e8025"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UploadModule-cbca01376dbb28dfcebd45d2bc47d2307d266ef0af864643b5769ae2bc2e81a98fb48b815a5139e09ebb29cbd1a7d90c2c8013dac558ecba6e54b419c43e8025"' :
                                        'id="xs-injectables-links-module-UploadModule-cbca01376dbb28dfcebd45d2bc47d2307d266ef0af864643b5769ae2bc2e81a98fb48b815a5139e09ebb29cbd1a7d90c2c8013dac558ecba6e54b419c43e8025"' }>
                                        <li class="link">
                                            <a href="injectables/UploadService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CarouselsController.html" data-type="entity-link" >CarouselsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SharepointController.html" data-type="entity-link" >SharepointController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TelegramController.html" data-type="entity-link" >TelegramController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UploadController.html" data-type="entity-link" >UploadController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/CarouselEntiy.html" data-type="entity-link" >CarouselEntiy</a>
                                </li>
                                <li class="link">
                                    <a href="entities/DocumentLibraryEntity.html" data-type="entity-link" >DocumentLibraryEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/MediaSharepointEntity.html" data-type="entity-link" >MediaSharepointEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/SiteCollectionEntity.html" data-type="entity-link" >SiteCollectionEntity</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseDeleteDTO.html" data-type="entity-link" >BaseDeleteDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseDTO.html" data-type="entity-link" >BaseDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseEntities.html" data-type="entity-link" >BaseEntities</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseModels.html" data-type="entity-link" >BaseModels</a>
                            </li>
                            <li class="link">
                                <a href="classes/BasePaginationDTO.html" data-type="entity-link" >BasePaginationDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseRepository.html" data-type="entity-link" >BaseRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseUpdateDTO.html" data-type="entity-link" >BaseUpdateDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CarouselDTO.html" data-type="entity-link" >CarouselDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Carousels.html" data-type="entity-link" >Carousels</a>
                            </li>
                            <li class="link">
                                <a href="classes/DocumentLibrary.html" data-type="entity-link" >DocumentLibrary</a>
                            </li>
                            <li class="link">
                                <a href="classes/DocumentLibraryRepository.html" data-type="entity-link" >DocumentLibraryRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/MediaSharepoint.html" data-type="entity-link" >MediaSharepoint</a>
                            </li>
                            <li class="link">
                                <a href="classes/MediaSharepointRepository.html" data-type="entity-link" >MediaSharepointRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseData.html" data-type="entity-link" >ResponseData</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponsePaginationData.html" data-type="entity-link" >ResponsePaginationData</a>
                            </li>
                            <li class="link">
                                <a href="classes/SharepointCreateDocumentLibraryDTO.html" data-type="entity-link" >SharepointCreateDocumentLibraryDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SharepointDeleteDocumentLibraryDTO.html" data-type="entity-link" >SharepointDeleteDocumentLibraryDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SharepointDeleteFileDTO.html" data-type="entity-link" >SharepointDeleteFileDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SharepointDeleteSiteCollectionDTO.html" data-type="entity-link" >SharepointDeleteSiteCollectionDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SharepointDTO.html" data-type="entity-link" >SharepointDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SharepointFileByPaginationDTO.html" data-type="entity-link" >SharepointFileByPaginationDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SharepointFileDTO.html" data-type="entity-link" >SharepointFileDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SharepointGetImageDTO.html" data-type="entity-link" >SharepointGetImageDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SharepointSoftDeleteDocumentLibraryDTO.html" data-type="entity-link" >SharepointSoftDeleteDocumentLibraryDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SharepointUpdateDocumentLibraryDTO.html" data-type="entity-link" >SharepointUpdateDocumentLibraryDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SharepointUploadFileDTO.html" data-type="entity-link" >SharepointUploadFileDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SiteCollection.html" data-type="entity-link" >SiteCollection</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CarouselsRepository.html" data-type="entity-link" >CarouselsRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CarouselsService.html" data-type="entity-link" >CarouselsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParseFile.html" data-type="entity-link" >ParseFile</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharepointService.html" data-type="entity-link" >SharepointService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SiteCollectionRepository.html" data-type="entity-link" >SiteCollectionRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TelegramService.html" data-type="entity-link" >TelegramService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UploadService.html" data-type="entity-link" >UploadService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AdditionalProperties.html" data-type="entity-link" >AdditionalProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BaseInterfaceRepository.html" data-type="entity-link" >BaseInterfaceRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICarousels.html" data-type="entity-link" >ICarousels</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDocumentLibrary.html" data-type="entity-link" >IDocumentLibrary</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMediaSharepoint.html" data-type="entity-link" >IMediaSharepoint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IReponsePaginationData.html" data-type="entity-link" >IReponsePaginationData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResponseData.html" data-type="entity-link" >IResponseData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISiteCollection.html" data-type="entity-link" >ISiteCollection</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});