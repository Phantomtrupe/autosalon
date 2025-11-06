'use strict'

const lpcQueryString = window.location.search;

if (lpcQueryString.includes('lpc_disable_snow')) {
	
	createCookie('lpc_disable_snow', 1, 30);
}

;(function() {
	var $win = $(window),
		$doc = $(document),
		$html = $(document.documentElement),
		$body = $(document.body),
		iOs = /iPhone|iPad|iPod/i.test(navigator.userAgent),
		isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
		initializedMaps = [],
		youtubeListPlayers = [];
		

	window.lp_template = {
		version: 'landing page v3',
		queue: {}
	};
	
	/*lp_template.queue.newYear = function($self) {
		if (!!document.querySelector('#lp_constructor')) {
			let lpcSnow = `<div id="lpc-snow-block" class="sky"></div>`;
			let newYearTpl = `<div class="lpc-new-year">
				<ul class="lpc-new-year__items">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
				<ul class="lpc-new-year__items">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li class="first_red_toy"></li>
					<li class="green_toy"></li>
				</ul>
				<ul class="lpc-new-year__items second_items">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li class="red_toy"></li>
				</ul>
				<ul class="lpc-new-year__items">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li class="last_green_toy"></li>
				</ul>
				<ul class="lpc-new-year__items">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>`;
		
			if (!!document.querySelector('#lp_constructor') && !$('.lpc-new-year__items').length) {
				$('#landing_page_controls').append(newYearTpl);
				//$('#landing_page_site').append(newYearTpl);
				$('#landing_page_controls').append(lpcSnow);

				if (readCookie('lpc_disable_snow') != '1') {
					letItSnow();
				};
			};
		
			let $snow = $('#lpc-snow-block');
			
			const config = {
				attributes: true
			};
		
			const callback = function (mutationsList, observer) {
				
				for (let mutation of mutationsList) {
					if (!$(target).hasClass('hidden')) {
						
						$('#lp_constructor').addClass('opened');
						$snow.appendTo($('#landing_page_controls'));
						
					} else {
						
						$('#lp_constructor').removeClass('opened');
						$snow.appendTo($('#landing_page_site'));
						
					}

					if (!$(target2).is(':hidden')) {
						$('._live._live--lp ._live__header').addClass('hide_live_header');
					} else {
						$('._live._live--lp ._live__header').removeClass('hide_live_header');
					}
				}
			};
		
			let target = document.querySelector('.folders-menu-wrapper');
			let target2 = document.querySelector('.block-css-controls');
		
			const observer = new MutationObserver(callback);
			const observer2 = new MutationObserver(callback);
		
			observer.observe(target, config);
			observer2.observe(target2, config);
		};
	};*/
	
	lp_template.queue.aboutPopupLink = function($self) {
		if (!s3LP.is_cms) {
			if(window.location.pathname != "/my/s3/cms/v1/lp/live.edit.php"){
			$('a[href^="popup:"]').attr('style','pointer-events: none');
			}
		    $(window).on('load', function(){
				$('a[href^="popup:"]').attr('style','pointer-events: auto');
			})
		}
	}
	
	lp_template.queue.blockAfterBefore = function ($self) {
		var $block = $self.find(".lp-before-and-after-init");
	
		if ($block.length) {
			(() => {'use strict';
	
				class BeforeAfter {
					constructor(selector = '.before-after') {
						this.selector = selector;
						this.items = [];
					}
	
					init() {
						let wrappers = document.querySelectorAll(this.selector);
	
						for (let wrapper of wrappers) {
							if (wrapper.dataset.beforeAfterInitialized === 'true') {
								continue;
							}
							let item = new BeforeAfterItem(wrapper).init();
							this.items.push(item);
							
							wrapper.dataset.beforeAfterInitialized = 'true';
							
							let observer = new MutationObserver(function (mutations) {
								mutations.forEach(function (mutation) {
									if ($(mutation.target).hasClass('lp-selected-element')) {
										$(mutation.target).parent().addClass('active');
									} else {
										$(mutation.target).parent().removeClass('active');
									}
								});
							});
							let config = {
								attributes: true,
								attributeFilter: ['class']
							};
							
							observer.observe($(wrapper).find('.before-after__img-before')[0], config);
							observer.observe($(wrapper).find('.before-after__img-after')[0], config);
						}
					}
				}
	
				class BeforeAfterItem {
					constructor(el) {
						this.wrapper = el;
						this.dragElWrapper = null;
						this.viewport = null;
						this.before = null;
						this.after = null;
						this.offset = 0;
						this.pageXStart = 0;
						this.startOffset = 0;
						this.onPointerDown = this.onPointerDown.bind(this);
						this.onPointerMove = this.onPointerMove.bind(this);
						this.onPointerUp = this.onPointerUp.bind(this);
					}
					init() {
						let wrapper = this.wrapper;
	
						let dragElWrapper = this.dragElWrapper = document.createElement('div');
	
						dragElWrapper.classList.add('before-after__drag-wrapper');
						dragElWrapper.style.left = '50%';
	
						let dragEl = document.createElement('div');
	
						dragEl.classList.add('before-after__drag');
	
						dragElWrapper.append(dragEl);
	
						let viewport = this.viewport = wrapper.querySelector('.before-after__viewport');
	
						viewport.append(dragElWrapper);
						wrapper.classList.add('before-after--loaded');
	
						this.before = viewport.querySelector('.lp-image-before');
						this.after = viewport.querySelector('.lp-image-after');
	
						this.move(this.offset);
	
						dragElWrapper.addEventListener('mousedown', this.onPointerDown);
						dragElWrapper.addEventListener('touchstart', this.onPointerDown);
	
						dragElWrapper.addEventListener('dragstart', () => {
							return false;
						});
	
						return this;
					}
	
					onPointerDown(e) {
						e.stopPropagation();
	
						if (e.touches) {
							this.pageXStart = e.touches[0].pageX;
						} else {
							this.pageXStart = e.pageX;
						}
						this.startOffset = this.offset;
	
						document.addEventListener('mousemove', this.onPointerMove);
						document.addEventListener('touchmove', this.onPointerMove);
						document.addEventListener('mouseup', this.onPointerUp);
						document.addEventListener('touchend', this.onPointerUp);
					}
	
					onPointerMove(e) {
						let viewport = this.viewport,
							pxOffset = 0,
							percentOffset = 0;
	
						if (e.touches) {
							pxOffset = e.touches[0].pageX - this.pageXStart;
						} else {
							pxOffset = e.pageX - this.pageXStart;
						}
	
						percentOffset = parseFloat((pxOffset / viewport.clientWidth * 100).toFixed(6));
	
						this.offset = this.startOffset + percentOffset;
	
						if (this.offset >= 50) {
							this.offset = 50;
						} else if (this.offset <= -50) {
							this.offset = -50;
						}
	
						this.move(this.offset);
					}
	
					onPointerUp() {
						document.removeEventListener('mousemove', this.onPointerMove);
						document.removeEventListener('touchmove', this.onPointerMove);
						document.removeEventListener('mouseup', this.onPointerUp);
						document.removeEventListener('touchend', this.onPointerUp);
					}
	
					move(offset) {
						this.dragElWrapper.style.left = 'calc(50% + ' + offset + '%)';
						this.before.style.clipPath = 'inset(0 calc(50% - ' + offset + '%) 0 0)';
						this.after.style.clipPath = 'inset(0 0 0 calc(50% + ' + offset + '%))';
					}
	
				}
				window.BeforeAfter = BeforeAfter;
			})();
	
			new BeforeAfter().init();
		}
	};
	
	lp_template.queue.splideMarquee = function ($self) {
		let $block = $self.attr('data-marquee-init') ? $self : $self.find('[data-marquee-init]');
	
		setTimeout(function(){
		
			if ($block.length) {
				$block.each(function () {
					let $this = $(this);
					let mediaGap = $this.data('marquee-margin');
					let mediaPerPage = $this.data('marquee-count');
					let margueeDrag = $this.data('marquee-drag');
					let margueePause = $this.data('marquee-pause');
					let margueeSpeed = $this.data('marquee-speed');
					let margueeReverse = $this.data('marquee-revese');
	
					let autoScrollSpeed = (margueeReverse === true || margueeReverse === 'true') ? -margueeSpeed : margueeSpeed;
		
					if ($(this).data('move')) {
						var $mediaMove = $(this).data('move');
					} else {
						var $mediaMove = 1;
					}
		
					if ($this.find('.splide').not('.is-active').length != 0) {
		
						$this.find('.splide').not('.is-active').each(function () {
						
							let splide = new Splide($(this)[0], {
								type: 'loop',
								drag: margueeDrag,
								focus: 'center',
								arrows: false,
								pagination: false,
								perMove: $mediaMove,
								perPage: checkInitPerPage(),
								lazyLoad: 'nearby',
								autoScroll: {
									speed: autoScrollSpeed,
									pauseOnHover: margueePause,
									pauseOnFocus: margueePause,
								}
							});
							
							splide.mount(window.splide.Extensions);
		
							sliderBreakPoints();
		
							//document.addEventListener('dataMediaSourceChange', sliderBreakPoints);
		
							function sliderBreakPoints() {
								let dataMediaSource = document.querySelector('html').dataset.mediaSource;
		
								switch (dataMediaSource) {
									case 'media-xl':
										splide.options = {
											gap: mediaGap[0],
											perPage: mediaPerPage[0],
										};
										break;
									case 'media-lg':
										splide.options = {
											gap: mediaGap[1],
											perPage: mediaPerPage[1],
										};
										break;
									case 'media-md':
										splide.options = {
											gap: mediaGap[2],
											perPage: mediaPerPage[2],
										};
										break;
									case 'media-sm':
										splide.options = {
											gap: mediaGap[3],
											perPage: mediaPerPage[3],
										};
										break;
									case 'media-xs':
										splide.options = {
											gap: mediaGap[4],
											perPage: mediaPerPage[4],
										};
										break;
								}
							};
		
							function checkInitPerPage() {
								let dataMediaSource = document.querySelector('html').dataset.mediaSource;
		
								switch (dataMediaSource) {
									case 'media-xl':
										return mediaPerPage[0]
										break;
									case 'media-lg':
										return mediaPerPage[1]
										break;
									case 'media-md':
										return mediaPerPage[2]
										break;
									case 'media-sm':
										return mediaPerPage[3]
										break;
									case 'media-xs':
										return mediaPerPage[4]
										break;
								};
							};
						});
					}
				});
			}
		
		}, 1000);
	};
	
	lp_template.queue.newHeaderInit = function ($self) {
		let $block = $self.find('.js-header-init');
	
		if (!$block.length) return;
	
		const $menu = $block.find('.lp-exclusive-hat__menu');
		const $menuList = $menu.find('.lp-exclusive-hat__menu-list');
		const $moreItem = $menuList.find('.lp-more');
		const $items = $menuList.find('.lp-exclusive-hat__menu-item:not(.lp-more)');
		const $burgerButton = $block.find('.js-burger-open');
		const $burgerPopup = $block.find('.lp-exclusive-hat__popup');
		const $burgerInner = $block.find('.lp-exclusive-hat__popup-inner');
		const $closeButton = $block.find('.lp-exclusive-hat__popup-close');
		const $wrap = $block;
		const $fixedContainer = $block.closest('.lp-fixed-block:not(.js-community)');
	
		function adaptMenu() {
			const $menu = $('.lp-exclusive-hat__menu');
			const $menuList = $menu.find('.lp-exclusive-hat__menu-list');
			const $moreItem = $menuList.find('.lp-more');
			const $items = $menuList.find('.lp-exclusive-hat__menu-item:not(.lp-more)');
		
			if (!$menu.length || !$menuList.length || !$moreItem.length || !$items.length) return;
		
			$items.removeClass('hidden revealed');
			$moreItem.removeClass('hidden active');
			$moreItem.css('display', 'inline-flex');
			
			const originalWrap = $menuList[0].style.flexWrap;
			$menuList[0].style.flexWrap = 'nowrap';
		
			const menuWidth = $menu[0].offsetWidth;
			const moreWidth = $moreItem[0].offsetWidth;
			
			const computedStyle = window.getComputedStyle($menuList[0]);
			const gap = parseInt(computedStyle.columnGap || computedStyle.gap || 0);
		
			let usedWidth = moreWidth;
			let hasHidden = false;
		
			$items.each(function (index) {
				const $item = $(this);
				const itemWidth = $item.outerWidth(); 
				
				if (index > 0) usedWidth += gap;
		
				if (usedWidth + itemWidth > menuWidth) {
					$item.addClass('hidden');
					hasHidden = true;
				} else {
					usedWidth += itemWidth;
				}
			});
			
			$menuList[0].style.flexWrap = originalWrap;
			$moreItem.css('display', hasHidden ? 'inline-flex' : 'none');
		}
	
		function toggleHiddenItems() {
			const isActive = $moreItem.hasClass('active');
			$menuList.find('.lp-exclusive-hat__menu-item.hidden').each(function () {
				$(this).toggleClass('revealed', !isActive);
			});
			$moreItem.toggleClass('active', !isActive);
		}
		
		function setupBurgerMenu() {
			if (!$burgerButton.length || !$burgerPopup.length || !$burgerInner.length || !$closeButton.length) return;
	
			const html = document.documentElement;
			const $hat = $block;
	
			function toggleBurger(open) {
				$burgerPopup.toggleClass('is-active', open);
				$(html).toggleClass('no-scroll', open);
				
				if (s3LP.is_cms) {
					if (open) {
						$hat.css('z-index', 999);
					} else {
						$hat.css('z-index', '');
					}
				}
			}
	
			$burgerButton.on("click", function (e) {
				e.stopPropagation();
				toggleBurger(true);
			});
	
			$closeButton.on("click", function (e) {
				e.stopPropagation();
				toggleBurger(false);
			});
	
			$(document).on("keydown", function (e) {
				if (e.key === "Escape") toggleBurger(false);
			});
	
			if (!s3LP.is_cms) {
				
				$(document).on("click", function (e) {
					if (!$burgerPopup.hasClass("is-active")) return;
		
					const clickedInside = $burgerInner[0].contains(e.target);
					const clickedLink = $(e.target).closest("a").length;
		
					if (!clickedInside || clickedLink) {
						requestAnimationFrame(() => toggleBurger(false));
					}
				});
			}
		}
		
		setupBurgerMenu();
		
		if ($block.find('.lp-menu-more-init').length) {
			
			adaptMenu();
			
			let resizeTimer;
			$(window).on('resize', function () {
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(adaptMenu, 150);
			});
	
			$moreItem.on('click', toggleHiddenItems);
		}
		
		setTimeout(function () {
			if ($wrap.length && $fixedContainer.length) {
				$fixedContainer.css('height', $wrap.outerHeight() + 'px');
			}
		}, 100);
		
		$(window).on('scroll', function () {
			const $wrap = $block.closest(".lp-fixed-block .lp-exclusive-hat__container");
			if ($wrap.length) {
				$wrap.toggleClass("fixed", window.scrollY > 0);
			}
		});
	};
	
	lp_template.queue.movingPictures = function ($self) {
	    let $block = $self.find('.lp_moving_pictures_init');
	
	    if ($block.length) {
	    	
	        setTimeout(function () {
	        	
	            $block.each(function () {
	                let $this = $(this),
	                    $wrapper = $this.find('.lp_moving_pictures_wrap'),
	                    $marquee = $this.find('.lp_moving_pictures_move'),
	                    marqueeSpeed = $this.data('marquee-speed') || 1,
	                	speed = marqueeSpeed,
	                    position = 0,
	                    animationFrame,
	                    wrapperWidth = $wrapper[0].offsetWidth,
	                    direction = 'left',
	                    isInMiddle = false,
	                    totalWidth = 0;
	
	                if (!s3LP.is_cms) {
	                	
	                    $marquee.find('.lp_moving_pictures_item').each(function () {
	                        totalWidth += $(this).outerWidth(true);
	                    });
	
	                    while (totalWidth < wrapperWidth) {
	                        $marquee.find('.lp_moving_pictures_item').each(function () {
	                            let $clone = $(this).clone();
	                            $marquee.append($clone);
	                            totalWidth += $clone.outerWidth(true);
	                        });
	                    }
	
	                    let clonedContent = $marquee.html();
	                    $marquee.html(clonedContent + clonedContent);
	                    
	                } else {
	                	
	                	function s3lazyLoadImages() {
	                		
		                	const $s3lazyImage = $(".lp-ticker__carousel-mask-item img[data-src]");
							
		                    const s3LoadImage = (image) => {
		                        const src = $(image).attr('data-src');
								
		                        if (src) {
		                            $(image).attr('src', src);
		                            $(image).removeAttr('data-src');
		                        }
		                    };
		                    
		                    $s3lazyImage.each(function () {
		                        s3LoadImage(this);
		                    });
		                }
		                
		                s3lazyLoadImages();
	                }
	
	                let marqueeWidth = totalWidth;
	                
	                function lazyLoadImages() {
						const $lazyImage = $(".lp-ticker__carousel-mask-item img[data-src]");
						
	                    const loadImage = (image) => {
	                        const src = $(image).attr('data-src');
							
	                        if (src) {
	                            $(image).attr('src', src);
	                            $(image).removeAttr('data-src');
	                        }
	                    };
	                    
	                    const isImageVisible = (image) => {
	                        let imgLeft = $(image).offset().left,
	                            imgRight = imgLeft + $(image).outerWidth(),
	                            wrapperLeft = $wrapper.offset().left,
	                            wrapperRight = wrapperLeft + $wrapper.outerWidth();
	
	                        return imgRight > wrapperLeft && imgLeft < wrapperRight;
	                    };
	                    
	                    $lazyImage.each(function () {
	                        if (isImageVisible(this)) {
	                            loadImage(this);
	                        }
	                    });
	                }
	
	                function move() {
	                    window.cancelAnimationFrame(animationFrame);
	
	                    if (direction === 'left') {
	                        position -= speed;
	                    } else {
	                        position += speed;
	                    }
	
	                    if (!s3LP.is_cms) {
	                    	
	                        if (direction === 'left' && position <= -marqueeWidth) {
	                            position = 0;
	                        } else if (direction === 'right' && position >= 0) {
	                            position = -marqueeWidth;
	                        }
	
	                        $marquee.css('transform', 'translate3d(' + position + 'px, 0, 0)');
	
	                        animationFrame = window.requestAnimationFrame(move);
	                        
	                        lazyLoadImages();
	
	                    } else {
	                    	
	                        if (direction === 'left' && position <= -(marqueeWidth - wrapperWidth)) {
	                            window.cancelAnimationFrame(animationFrame);
	                            return;
	                        } else if (direction === 'right' && position >= 0) {
	                            window.cancelAnimationFrame(animationFrame);
	                            return;
	                        }
	
	                        $marquee.css('transform', 'translate3d(' + position + 'px, 0, 0)');
	
	                        animationFrame = window.requestAnimationFrame(move);
	                    }
	                }
	
	                move();
	
	                var leftRightZoneWidth = wrapperWidth * 0.4;
	                var middleZoneWidth = wrapperWidth * 0.2;
	
	                var getZone = function (posX) {
	                    if (posX < leftRightZoneWidth) {
	                        return 'left';
	                    } else if (posX > wrapperWidth - leftRightZoneWidth) {
	                        return 'right';
	                    } else {
	                        return 'middle';
	                    }
	                };
	
	                var prevMouseX;
	                var minSpeed = speed;
	
	                var handleMove = function (event, isTouch = false) {
	                    var posX = isTouch ? event.originalEvent.touches[0].pageX - $wrapper[0].getBoundingClientRect().left : event.pageX - $wrapper[0].getBoundingClientRect().left;
	                    var zone = getZone(posX);
	                    var speedIncrement = 0.03;
	                    var maxSpeed = speed + (speed * 0.5);
	
	                    if (zone === 'left') {
	                        direction = 'right';
	
	                        if (prevMouseX !== undefined) {
	                            var distanceMoved = prevMouseX - posX;
	                            speed += distanceMoved * speedIncrement;
	                            speed = Math.max(minSpeed, Math.min(speed, maxSpeed));
	                        }
	
	                        prevMouseX = posX;
	
	                    } else if (zone === 'right') {
	                        direction = 'left';
	
	                        if (prevMouseX !== undefined) {
	                            var distanceMoved = posX - prevMouseX;
	                            speed += distanceMoved * speedIncrement;
	                            speed = Math.max(minSpeed, Math.min(speed, maxSpeed));
	                        }
	
	                        prevMouseX = posX;
	
	                    } else if (zone === 'middle') {
	                        window.cancelAnimationFrame(animationFrame);
	                        isInMiddle = true;
	                        prevMouseX = posX;
	                        return;
	                    }
	
	                    if (isInMiddle) {
	                        isInMiddle = false;
	                        move();
	                    }
	                };
	
	                if (isMobile) {
	                    $wrapper.on('touchmove', function (event) {
	                        handleMove(event, true);
	                    });
	
	                    $wrapper.on('touchend', function () {
	                        speed = minSpeed;
	                        prevMouseX = undefined;
	                        move();
	                    });
	                } else {
	                    $wrapper.on('mousemove', handleMove);
	
	                    $wrapper.on('mouseleave', function () {
	                        speed = minSpeed;
	                        prevMouseX = undefined;
	                        move();
	                    });
	                }
	            });
	            
	            lp_template.queue.lgNew($block);
	
	        }, 500);
	    }
	};
	
	lp_template.queue.refreshForm = function ($self) {
	    
	    const $refreshButton = $('.lp-refresh-form');
	    if (!$refreshButton.length) return;
	
	    $refreshButton.each(function () {
	        const $button = $(this);
	
	        const href = $button.attr('href');
	        if (!href) return;
	        
	        const popupMatch = href.match(/popup:_lp_block_(\d+)/);
	        if (!popupMatch) return;
	
	        const popupId = popupMatch[1];
	        const $popupElement = $(`[data-block-id="${popupId}"]`);
	        if (!$popupElement.length) return;
	
	        const $form = $popupElement.find('.lp-form-tpl');
	        if (!$form.length) {
	            console.warn('Форма не найдена внутри попапа');
	            return;
	        }
	
	        const apiUrl = $form.attr('data-api-url');
	        if (!apiUrl) {
	            console.warn('API URL не найден у формы');
	            return;
	        }
	
	        const $successBlock = $popupElement.find('.hide-on-success');
	        let $successClone = null;
	        if ($successBlock.length) {
	            $successClone = $successBlock.clone(true);
	        }
	
	        $button.off('click.refreshForm').on('click.refreshForm', function (e) {
	            e.preventDefault();
	
	            const isFormSubmitted = $popupElement.find('.lp-form-tpl__success').length > 0;
	            
	            if (!isFormSubmitted) return;
	
	            const $formOld = $popupElement.find('.lp-form-tpl');
	            const $productBlock = $button.closest('.lp-product-name');
        		const prodName = $productBlock.find('[data-name-product]').data('name-product') || '';
	
	            $.ajax({
	                url: apiUrl,
	                dataType: 'json',
	                success: function (response) {
	                    if (!response.result.error) {
	                        const htmlForm = response.result.html;
	                        const $tempContainer = $('<div>').append($.parseHTML(htmlForm));
	                        const $newFormTpl = $tempContainer.find('.lp-form-tpl');
	
	                        if (!$newFormTpl.length) return;
	
	                        $formOld.replaceWith($newFormTpl);
	                        
	                        $newFormTpl.find('.lp-form-tpl__title-wrapper').remove();
	
	                        if ($successClone && $popupElement.find('.hide-on-success').length === 0) {
	                            $newFormTpl.before($successClone);
	                        }
	
	                        s3LP.initForms($(`#_lp_block_${popupId}`));
	                        
	                        setTimeout(function () {
	                            const $newForm = $popupElement.find('.lp-form-tpl');
	                            const $targetInput = $newForm.find('input[data-alias="product_name"]');
	
	                            if (prodName && $targetInput.length) {
	                                $targetInput.val(prodName);
	                            } else {
	                                console.warn('Имя товара или поле не найдено');
	                            }
	                        }, 100);
	
	                    } else {
	                        console.warn('Ошибка в ответе сервера:', response.result.message);
	                    }
	                },
	                error: function (xhr, status, error) {
	                    console.error('Ошибка при получении формы:', status, error);
	                }
	            });
	        });
	    });
	};
	
	lp_template.queue.sliderBlockThumb = function ($self) {
	    var $block = $self.attr('data-slider-thumb-init') ? $self : $self.find('[data-slider-thumb-init]');
	    if ($block.length) {
	        $block.each(function(){
	            let $this = $(this);
				let $alignItem = $this.find($this.data('align-item'));
				let mediaGap = $this.data('margin');
				let mediaPerPage = $(this).data('count');
				let mediaThumbGap = $this.data('thumb-margin');
				let mediaThumbFixedWidth = $this.data('thumb-width');
				let mediaThumbFixedHeight = $this.data('thumb-height');
	                
	            if($this.find('#main-slider').not('.is-active').length != 0 ) {
	                let splideThumb = new Splide( $this.find('.splide').not('.is-active')[0], {
						autoplay: $this.data('autoplay'),
						speed: $this.data('speed'),
						interval: $this.data('pause'),
	                    rewind: $this.data('infinite'),
	                    lazyLoad: $this.data('lazy-load'),
	                    rewind: true,
	                    perMove: 1,
						perPage: checkInitPerPage(),
						dragMinThreshold: {
						    mouse: 5,
						    touch: 10,
						}	
	                });
	                
	                let thumbnails = new Splide($this.find('.thumbnail-slider').not('.is-active')[0], {
					  rewind          : $this.data('rewind'),
					  fixedWidth      : checkInitThumbWidth(),
					  fixedHeight     : checkInitThumbHeight(),
					  isNavigation    : true,
					  focus           : $this.data('thumb-focus'),
					  pagination      : false,
					  cover           : false,
					  arrows     	  : $this.data('thumb-arrow'),
                	  drag            : false,
                	  padding         : 4,
					  gap             : checkInitThumbGap(),
					  dragMinThreshold: {
					    mouse: 5,
					    touch: 10,
					  }	,
					  classes 		  : {
					  	arrows: "splide__arrows splide__custom__arrows"
					  }
					});

	                 splideThumb.sync(thumbnails);
	                
	                 splideThumb.mount();
	                
             		 thumbnails.mount();
                	
					 sliderBreakPoints();
					
					 sliderPaginationChecking();
					
					 //document.addEventListener('dataMediaSourceChange', sliderBreakPoints);
										
					function sliderBreakPoints() {
		                let dataMediaSource = document.querySelector('html').dataset.mediaSource;
		
						setTimeout(function(){
							if ($alignItem.length) {
								let itemHeight = $alignItem.outerHeight() / 2;
								let arrowsPosition = itemHeight + $alignItem.position().top;
	
								$this.find('.splide__arrow').css('top', arrowsPosition);
							}
						}, 100);
						
		                switch (dataMediaSource) {
		                    case 'media-xl':
		                        splideThumb.options = {
									arrows: true,
									pagination: true,
		                            gap: mediaGap[0],
		                            perPage: mediaPerPage[0],
		                        };

		                        break;
		                    case 'media-lg':
		                        splideThumb.options = {
									arrows: true,
									pagination: true,
		                            gap: mediaGap[1],
		                            perPage: mediaPerPage[1],
		                        };
		
		                        break;
		                    case 'media-md':
		                        splideThumb.options = {
									arrows: true,
									pagination: true,
		                            gap: mediaGap[2],
		                            perPage: mediaPerPage[2],
		                        };
		                        break;
		                    case 'media-sm':
		                        splideThumb.options = {
									arrows: false,
									pagination: true,
		                            gap: mediaGap[3],
		                            perPage: mediaPerPage[3],
		                        };
		
		                        break;
		                    case 'media-xs':
		                        splideThumb.options = {
									arrows: false,
									pagination: true,
		                            gap: mediaGap[4],
		                            perPage: mediaPerPage[4],
		                        };

		                        break;
		                }
		                if($block.data('slider-thumb-init') == true) {
							switch (dataMediaSource) {
			                    case 'media-xl':
			                        thumbnails.options = {
			                            gap: mediaThumbGap[0],
			                            fixedWidth: mediaThumbFixedWidth[0],
			                            fixedHeight: mediaThumbFixedHeight[0],
			                        };
			
			                        break;
			                    case 'media-lg':
			                        thumbnails.options = {
			                            gap: mediaThumbGap[1],
			                            fixedWidth: mediaThumbFixedWidth[1],
			                            fixedHeight: mediaThumbFixedHeight[1],
			                        };
			
			                        break;
			                    case 'media-md':
			                        thumbnails.options = {
			                            gap: mediaThumbGap[2],
			                            fixedWidth: mediaThumbFixedWidth[2],
			                            fixedHeight: mediaThumbFixedHeight[2],
			                        };
			
			                        break;
			                    case 'media-sm':
			                        thumbnails.options = {
			                            gap: mediaThumbGap[3],
			                            fixedWidth: mediaThumbFixedWidth[3],
			                            fixedHeight: mediaThumbFixedHeight[3],
			                        };
			
			                        break;
			                    case 'media-xs':
			                        thumbnails.options = {
			                            gap: mediaThumbGap[4],
			                            fixedWidth: mediaThumbFixedWidth[4],
			                            fixedHeight: mediaThumbFixedHeight[4],
			                        };
			                        
			                        break;
			                }
						}
					};
					
					function checkInitPerPage() {
						let dataMediaSource = document.querySelector('html').dataset.mediaSource;
					
						switch (dataMediaSource) {
							case 'media-xl':
								return mediaPerPage[0]
								break;
							case 'media-lg':
								return mediaPerPage[1]
								break;
							case 'media-md':
								return mediaPerPage[2]
								break;
							case 'media-sm':
								return mediaPerPage[3]
								break;
							case 'media-xs':
								return mediaPerPage[4]
								break;
						};
					};
					
					function checkInitThumbWidth() {
						let dataMediaSource = document.querySelector('html').dataset.mediaSource;
					
						switch (dataMediaSource) {
							case 'media-xl':
								return mediaThumbFixedWidth[0]
								break;
							case 'media-lg':
								return mediaThumbFixedWidth[1]
								break;
							case 'media-md':
								return mediaThumbFixedWidth[2]
								break;
							case 'media-sm':
								return mediaThumbFixedWidth[3]
								break;
							case 'media-xs':
								return mediaThumbFixedWidth[4]
								break;
						};
					};
					
					function checkInitThumbHeight() {
						let dataMediaSource = document.querySelector('html').dataset.mediaSource;
					
						switch (dataMediaSource) {
							case 'media-xl':
								return mediaThumbFixedHeight[0]
								break;
							case 'media-lg':
								return mediaThumbFixedHeight[1]
								break;
							case 'media-md':
								return mediaThumbFixedHeight[2]
								break;
							case 'media-sm':
								return mediaThumbFixedHeight[3]
								break;
							case 'media-xs':
								return mediaThumbFixedHeight[4]
								break;
						};
					};
					
					function checkInitThumbGap() {
						let dataMediaSource = document.querySelector('html').dataset.mediaSource;
					
						switch (dataMediaSource) {
							case 'media-xl':
								return mediaThumbGap[0]
								break;
							case 'media-lg':
								return mediaThumbGap[1]
								break;
							case 'media-md':
								return mediaThumbGap[2]
								break;
							case 'media-sm':
								return mediaThumbGap[3]
								break;
							case 'media-xs':
								return mediaThumbGap[4]
								break;
						};
					};
					
					function sliderPaginationChecking() {
						let sliderPaginationBlock = $this.find('.splide__custom__pagination');
						
						setTimeout(function() {
							if (sliderPaginationBlock.find('li').length == 1) {
								sliderPaginationBlock.hide();
							}
						}, 200);
					};
	            }
	        });
	    }	
	};
	
	lp_template.checkAutoplayVideo = function($blocks) {
		$blocks.each(function() {
			var $this = $(this),
				playStatus = $this.data('playStatus'),
				inViewport = isElementInViewport(this),
				$video = $this.find('video'),
				$thisVideo = $video.length ? $video : $this.find('iframe');
				
			
	
			if (inViewport && playStatus !== 'play') {
				$this.trigger('autoplayVideo', ['play', $thisVideo[0].nodeName.toLowerCase()]);
				$this.data('playStatus', 'play');
			} else if (!inViewport && playStatus === 'play') {
				$this.trigger('autoplayVideo', ['pause', $thisVideo[0].nodeName.toLowerCase()]);
				$this.data('playStatus', 'pause');
			}
		
		})
	}
	
	lp_template.queue.dropDownContacts = function ($self) {
	    let block = $self.find('.lp-drop-down-init');
	
	    if (block.length) {
	        block.each(function () {
	            let $this = $(this);
	            let countContact = $this.data('count-contact');
	
	            if (typeof countContact === 'undefined') return;
	
	            let $showAllButton = $this.find('.lp-contacts-more');
	            let $itemContact = $this.find('.lp-contacts-item:hidden');
	            let currentText = $showAllButton.text();
	            let hideText = $('html').attr('lang') === 'ru' ? 'Скрыть' : 'Hide';
	
	            $showAllButton.on('click', function () {
	                let $button = $(this);
	                $button.toggleClass('active');
	                $button.text($button.hasClass('active') ? hideText : currentText);
	                $this.toggleClass('active');
	            });
	        });
	    }
	};
	
	lp_template.queue.masonGallery = function ($self) {
		let $block = $self.find('.lp-masonry-init');
	
		if ($block.length) {
			$block.each(function () {
				let $this = $(this);
				let listbox = $this.find(".lp-image-mason__list");
				let lazyItems = $this.find(".lp-image-mason__item img[data-src]");
				let windowHeight = $(window).height();
	
				function loadVisibleItems() {
					lazyItems.each(function (index, item) {
						const rect = item.getBoundingClientRect();
	
						if (rect.top < windowHeight) {
							const img = $(item);
	
							if (!img.hasClass('is-loaded')) {
								img.on('load', function () {
									img.closest('.lp-image-mason__item').addClass('is-show');
									resizeGridItem(img.closest('.lp-image-mason__item'));
								});
	
								img.attr('src', img.data('src'));
								img.addClass('is-loaded');
							}
						}
					});
	
					lazyItems = $this.find(".lp-image-mason__item img[data-src]");
				}
	
				function resizeGridItem(item) {
					let grid = $this.find('.lp-image-mason__list');
					let rowHeight = parseInt(grid.css("grid-auto-rows"));
					let rowGap = parseInt(grid.css("grid-row-gap"));
	
					let rowSpan = Math.ceil(
						(item.find('.lp-image-mason__image').outerHeight() + rowGap) / (rowHeight + rowGap)
					);
					item.css("grid-row-end", "span " + rowSpan);
	
					let image = item.find('.lp-image-mason__image');
					image.css("height", "100%");
				}
	
				$(window).on('scroll', function () {
					loadVisibleItems();
				});
				
				loadVisibleItems();
			});
		}
	}
	
	lp_template.queue.donationsBlock = function($self) {
		let $block = $self.find('.lp-payment-block-2');
		
		if (!s3LP.is_cms) {
			$block.each(function(){
				let $this = $(this);
				let $price = $this.find('.lp-payment__form .lp-form-tpl__item:first-of-type').addClass('custom_price_input');
    
			    let $email = $this.find('.lp-payment__form input[name="email"]').val('example@gmail.com');
			    let $phone = $this.find('.lp-payment__form input[name="phone"]').val('+1234567890');
			    
			    $price.find('input[name="price"]').val($block.find('.lp_payment_buttons_js .lp-button--type-1').text().replace(/\D/g, ''));

				$this.find('.lp_payment_buttons_js .lp-button').on('click', function(){
			        let currentValue = $(this).text().replace(/\D/g, '');
			        
			        $this.find('.lp_payment_buttons_js .lp-button').removeClass('lp-button--type-1').addClass('lp-button--type-2');
			        $(this).removeClass('lp-button--type-2').addClass('lp-button--type-1');
			        
			        if ($(this).hasClass('custom_price_btn')) {
			            $price.fadeIn(200);
			            $this.find('input[name="price"]').val('').focus();
			        } else {
			            $this.find('input[name="price"]').val(currentValue);
			            $price.hide();
			        };
				});
			});
		}
	};
	
	lp_template.queue.iframeLazyLoading = function($self) {
		var $block = $self.find('.lp-lazy-iframe-js');
		var iframes = $block.find($('iframe'));
		
		if ($block.length && iframes.length) {
			var observer = new IntersectionObserver(function(entries, observer) {
				entries.forEach(function(entry) {
					if (entry.isIntersecting) {
						var iframe = entry.target;
						iframe.src = iframe.dataset.src;
						iframe.classList.remove('lazy');
						observer.unobserve(iframe);
					}
				});
			}, {
				root: null,
				rootMargin: '0px',
				threshold: 0.1
			});

			iframes.each(function() {
				var iframe = $(this);
				
				iframe.addClass('lazy'); 
				iframe.attr('data-src', iframe.attr('src'));
				iframe.attr('src', '');
				observer.observe(iframe[0]);
			});
		}
	};
	
	lp_template.queue.constructorClick = function ($self) {
		let $block = $self.find('.lp-constructor');
	
		if ($block.length) {
			$block.each(function () {
				let $this = $(this);
				let lpcClick = $this.find(".lp-active-click");
				let item = $this.find(".lp-constructor-click");
	
				if (s3LP.is_cms) {
					lpcClick.on('click', function () {
						item.toggleClass('lp-image-show');
					});
				}
			});
		}
	};
	
	lp_template.queue.typeWriter = function ($self) {
		let $block = $self.find('.lp-typewriter-init');
	
		if ($block.length) {
			$block.each(function () {
				const $this = $(this);
				const stringElements = $this.find(".lp-typewriter-string");
				const delay = $this.attr("data-delay");
				const delayDeletion = $this.attr("data-delay-deletion");
				const stopDialing = $this.attr("data-stop-dialing");
	
				function typeText(element, text, delay, callback) {
					let index = 0;
					const textLength = text.length;
	
					function addCharacter() {
						if (index < textLength) {
							element.textContent += text.charAt(index);
							index++;
							setTimeout(addCharacter, delay);
						} else {
							setTimeout(callback, delayDeletion);
						}
					}
	
					addCharacter();
				}
	
				function eraseText(element, delay, callback) {
					const text = element.textContent;
					let index = text.length;
	
					function removeCharacter() {
						if (index > 0) {
							element.textContent = text.substring(0, index - 1);
							index--;
							setTimeout(removeCharacter, delay);
						} else {
							callback();
						}
					}
	
					removeCharacter();
				}
	
				function animateElements(index) {
					if (index < stringElements.length) {
						const element = stringElements[index];
						const text = element.getAttribute("data-text");
				
						typeText(element, text, delay, function () {
							if (index === stringElements.length - 1 && stopDialing === "1") {
								
								setTimeout(function () {
									element.style.display = "inline";
									animateElements(index + 1);
								}, 250);
								
							} else {
								
								eraseText(element, delay, function () {
									element.style.display = "none";
									setTimeout(function () {
										animateElements(index + 1);
									}, 250);
								});
							}
						});
					} else {
						if (stopDialing === "1") {
							const lastElement = stringElements[stringElements.length - 1];
							const lastText = lastElement.getAttribute("data-text");
							lastElement.textContent = lastText;
						} else {
							setTimeout(function () {
								$this.find(".lp-typewriter-string").each(function () {
									$(this).text(""); 
									$(this).css("display", "inline");
								});
								animateElements(0);
							}, delay);
						}
					}
				}
	
				animateElements(0);
			});
		}
	}
	
	lp_template.queue.scrollToAnchor = function($self) {
		
		if (s3LP.is_cms) return;
		
		$self.on('click', 'a', function(e){
			var $this = $(this),
				thisHref = $this.attr('href');
				
			if (thisHref.length < 2 || thisHref[0] != '#') return;
			
			var $thisBlock = $(thisHref);
			
			if (!$thisBlock.length) return;
			
			e.preventDefault();
			
			//42658
			let scrollValue = $thisBlock.offset().top;
			const $fixedMenu =$(`.js-fixed-menu._to-fix-menu:not(._is-cms)`);

			if ($fixedMenu.size() && $fixedMenu.height()){
				scrollValue -= $fixedMenu.height();
			}
			
			$('html, body').animate({
				scrollTop: scrollValue
			});
			$('html').css({
				overflow: 'visible'
			});
		});
	}
	
	lp_template.popupAdaptiveBlock = function () {
  
	    let decorPopupWrap = document.querySelector(".lp-popup-inner .decor-wrap");
	    
	    if(decorPopupWrap) {
	    let decorPopupWrapWidth = decorPopupWrap.offsetWidth;
	      if (decorPopupWrapWidth < 480) {
	        decorPopupWrap.setAttribute("data-media-source", "media-xs");
	        checkMediaSource('media-xs');
	      } else if (decorPopupWrapWidth < 768) {
	        decorPopupWrap.setAttribute("data-media-source", "media-sm");
	        checkMediaSource('media-sm');
	      } else if (decorPopupWrapWidth < 992) {
	        decorPopupWrap.setAttribute("data-media-source", "media-md");
	        checkMediaSource('media-md');
	      } else if (decorPopupWrapWidth < 1280) {
	        decorPopupWrap.setAttribute("data-media-source", "media-lg");
	        checkMediaSource('media-lg');
	      } else if (decorPopupWrapWidth >= 1280) {
	        decorPopupWrap.setAttribute("data-media-source", "media-xl");
	        checkMediaSource('media-xl');
	      }
	    }
	};
	
	lp_template.checkMapInitialization = function ($blocks) {
	    $blocks.each(function () {
	        var $this = $(this),
	            id = $this.attr('id'); 
	       
	        if (!id) {
	            return;
	        }
	
	        if (initializedMaps.includes(id)) {
	            return;
	        }
	      
	        if (isElementInViewport(this)) {
	            initializedMaps.push(id); 
	            lp_template.initMaps($this);
	        }
	    });
	};

    lp_template.initGoogleMaps = function(options) {
        var map = new google.maps.Map(document.getElementById(options.id), {
            zoom: parseInt(options.zoom),
            scrollwheel: false,
            center: new google.maps.LatLng(options.center[0], options.center[1])
        });

        $.each(options.data, function(key, item) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(item.coords[0], item.coords[1]),
                map: map,
                title: item.name
            });

            var infowindow = new google.maps.InfoWindow({
                content: '<div class="baloon-content">' +
                    '<h3 style="margin: 0; padding-bottom: 3px;">' + item.name + '</h3>' +
                    item.desc +
                    '</div>'
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
        });
    }

    lp_template.initYandexMaps = function(options, objectListFlag) {
        if (objectListFlag) {
			let groups = options.data;
			
			var map = new ymaps.Map(options.id, {
		        center: options.center,
		        zoom: options.zoom,
		        behaviors: ["drag", "rightMouseButtonMagnifier"],
		    }, {
		        searchControlProvider: 'yandex#search'
		    });
	
			for (var i = 0; i < groups.length; i++) {
				createGroup(groups[i]);
			}
			
			if (options.data[0].items.length > 1) {
	            map.setBounds(map.geoObjects.getBounds());
	            map.setZoom(map.getZoom() - 1);
	        }
	        
			
		}else {
        
	        var map = new ymaps.Map(options.id, {
	            center: options.center,
	            zoom: options.zoom,
	            behaviors: ['drag', 'rightMouseButtonMagnifier'],
	        });
		}
        
        

        map.controls.add(
            new ymaps.control.ZoomControl()
        );

        var MyBalloonContentLayoutClass = ymaps.templateLayoutFactory.createClass(
            '<div class="baloon-content" style="padding: 0 10px;">' +
            '<h3 style="margin: 0;">$[properties.name]</h3>' +
            '<p>$[properties.desc]</p>' +
            '</div>'
        );

        var myCollection = new ymaps.GeoObjectCollection();

        if (objectListFlag) {
	        $.each(options.data, function(key, item) {
	            myCollection.add(new ymaps.Placemark(
	                item.coords,
	                item, {
	                    balloonContentLayout: MyBalloonContentLayoutClass
	                }
	            ));
	        });
        }else {
        	$.each(options.data, function (key, item) {
		    	if(this.image){
		    		myCollection.add(
			        new ymaps.Placemark(item.coords, item, {
			           balloonContentLayout: MyBalloonContentLayoutClass,
			           iconLayout: 'default#image',
			           iconImageHref: this.image,
			           iconImageOffset: [-15, -15],
			        })
			      );
		    	}	else{
			      myCollection.add(
			        new ymaps.Placemark(item.coords, item, {
			           balloonContentLayout: MyBalloonContentLayoutClass,
			           iconImageOffset: [-15, -15],
			           preset: this.icon,
			           iconColor: this.color,
			        })
			      );
		    	}
		    });
        }

        map.geoObjects.add(myCollection);

        $('#' + options.id).data('ymaps', map);
    }

    lp_template.initMaps = function($block) {
        var options = $block.data('init-params');
        
        if (!options) {
        	return;
        }
        
        $block.addClass('map-init');
        

        options = typeof options === 'string' ? JSON.parse(options) : options;
        

        if (typeof options.center === 'string') {
            options.center = options.center.split(',');
        }

        $.each(options.data, function(key, item) {
            if (typeof item.coords === 'string') {
                item.coords = item.coords.split(',');
            }
        });

        var keyMap = options.key ?? '';

        if (options.type === "google") {
            if (window.google && window.google.maps) {
                lp_template.initGoogleMaps(options);
            } else {
                var script = document.createElement('script');
                script.async = 'async';
                script.src = `//maps.googleapis.com/maps/api/js?key=${keyMap}`;
                document.body.append(script);

                script.onload = function() {
                    lp_template.initGoogleMaps(options);
                }
            }
        } else {
            if (typeof window.ymaps !== 'undefined') {
                lp_template.initYandexMaps(options)
            } else {
                /*var script = document.createElement('script');
                script.async = 'async';
                //script.src = `//api-maps.yandex.ru/2.1/?apikey=${keyMap}&lang=ru_RU`;
                
                //start 1935
                var scriptLangSrc = `${$ite.params.lang}_${$ite.params.lang.toUpperCase()}`;
                if (scriptLangSrc == 'en_EN') {
                	scriptLangSrc = 'en_US'
                }
                script.src = `//api-maps.yandex.ru/2.1/?apikey=${keyMap}&lang=` + scriptLangSrc;
                //end 1935
                
                document.body.append(script);

                script.onload = function() {
                    ymaps.ready(function() {
                        lp_template.initYandexMaps(options)
                    });
                }*/
                
                
                var htmlLang = document.documentElement.lang;
		        var script = document.createElement("script");
		        script.async = "async";
		        if (htmlLang == "en") {
				  if (keyMap!="") {
					script.src = `//api-maps.yandex.ru/2.1/?apikey=${keyMap}&lang=en_RU`;
				  } else {
					script.src = `//api-maps.yandex.ru/2.1/?lang=en_RU`;  
				  }
		        } else {
				  if (keyMap!="") {
					script.src = `//api-maps.yandex.ru/2.1/?apikey=${keyMap}&lang=ru_RU`;
				  } else {
					script.src = `//api-maps.yandex.ru/2.1/?lang=ru_RU`;  
				  }
		        }
		
		        document.body.append(script);
		
		        script.onload = function () {
		          ymaps.ready(function () {
		            lp_template.initYandexMaps(options);
		          });
		        };
            }
        }
    }
	
	/*
	lp_template.initMaps = function(options) {
		var map;
		
		if (options.type === "google") {
			map = new google.maps.Map(document.getElementById(options.id), {
				zoom: parseInt(options.zoom),
				scrollwheel: false,
				center: new google.maps.LatLng(options.center[0], options.center[1])
			});

			$.each(options.data, function(key, item) {
			
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(item.coords[0], item.coords[1]),
					map: map,
					title: item.name
				});

				var infowindow = new google.maps.InfoWindow({
					content: '<div class="baloon-content">' +
						'<h3 style="margin: 0; padding-bottom: 3px;">' + item.name + '</h3>' +
						item.desc +
						'</div>'
				});

				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map, marker);
				});
				
				
			});
		
		} else {
			
			ymaps.ready(function() {
			
				map = new ymaps.Map(options.id, {
					center: options.center,
					zoom: options.zoom,
					behaviors: ['drag', 'rightMouseButtonMagnifier'],
				});

				map.controls.add(
					new ymaps.control.ZoomControl()
				);

				var MyBalloonContentLayoutClass = ymaps.templateLayoutFactory.createClass(
					'<div class="baloon-content" style="padding: 0 10px;">' +
					'<h3 style="margin: 0;">$[properties.name]</h3>' +
					'<p>$[properties.desc]</p>' +
					'</div>'
				);

				var myCollection = new ymaps.GeoObjectCollection();

				$.each(options.data, function(key, item) {
					myCollection.add(new ymaps.Placemark(
						item.coords,
						item, {
							balloonContentLayout: MyBalloonContentLayoutClass
						}
					));
				});

				map.geoObjects.add(myCollection);
				
				$('#' + options.id).data('ymaps', map);
			});
		}
	}
	
	lp_template.queue.lpSimpleMap = function($self) {
		var $block = $self.find('.js-lp-simple-map');
		
		if ($block.length) {
			setTimeout(function(){
				$block.each(function(){
					var $this = $(this),
						thisParams = $this.data('init-params');
						
					thisParams = typeof thisParams === 'string' ? JSON.parse(thisParams) : thisParams;
						
					if (typeof thisParams.center === 'string') {
						thisParams.center = thisParams.center.split(',');
					}
					
					$.each(thisParams.data, function(key, item) {
						if (typeof item.coords === 'string') {
							item.coords = item.coords.split(',');
						}
					});
					
					lp_template.initMaps(thisParams);
				});
			}, 750);
		}
	}
	*/
	
	lp_template.queue.lpSliderMagic = function ($self) {
		
			//var $block = $self.hasClass('.lpc-flexible-image-js') ? $self : $self.find('.lpc-flexible-image-js');
		var $block = $self.hasClass('magic-slider') ? $self : $self.find('.magic-slider');
		if($block.length) {
			
			$block.each(function () {
				
				
				let $item = $(this);
				let $itemId = $item.attr('id');		
				
				let $sliderMagic = `#${$itemId}.magic-slider`;
				
	
				function sliderInit(parent){
					
			
					let sliderBlock = document.querySelector(parent);
					
					let decorWrap = document.querySelector('.decor-wrap');
					
					let mediaSource = decorWrap.getAttribute('data-media-source');
					
					if (!sliderBlock) return; // Проверка на существование элемента
					
					let sliderTrigger = Number(sliderBlock.getAttribute('data-trigger-hook'));
					
					let sliderContainer = sliderBlock.querySelector('.lp-prods-m__magic-slider-container');
					
					let slider = sliderBlock.querySelector('.lp-prods-m__magic-slider');
					
					let scrollWidth = 0;
					
					let slideBox = sliderBlock.querySelector('.lp-prods-m__wrap-box');
					
					let sliderTitle = sliderBlock.querySelector('.magic-slider-header');
					
					//let sliderContainerWidth = sliderContainer;
					//слайды
					let slideItem = sliderBlock.querySelectorAll('.lp-prods-m__magic-slide');
					
					// Количество слайдов
					let slideCount = slideItem.length;
					
					let progress = 0;
					
					let itemGap = 0;
					
					let slideWrap = sliderBlock.querySelector('.lpc-magic-full-width-init');
					
					
					function sliderInitInter() {	
							let slideWidth = slideWrap.offsetWidth;
							
							let docWidth = document.documentElement.clientWidth;
							
							//let itemMargin = (docWidth - slideWidth) / 2;
							//console.log(slideWrap.getBoundingClientRect().left);
							//console.log(slideWrap.getBoundingClientRect().right - slideWidth);
							
							let itemMarginLeft = slideWrap.getBoundingClientRect().left;
							
							//let itemMarginRight = slideWrap.getBoundingClientRect().right - slideWidth
							let itemMarginRight = docWidth - slideWrap.getBoundingClientRect().right;
							
							//console.log(itemMarginLeft)
							//console.log(itemMarginRight)
							/*if(sliderBlock.classList.contains('magic-slider-full-width')){
								slideBox.style.marginLeft = '-' + itemMargin + 'px';
								slideBox.style.marginRight = '-' + itemMargin + 'px';
							}
							slideBox.style.marginLeft = '-' + itemMargin + 'px';
							slideBox.style.marginRight = '-' + itemMargin + 'px';*/
							
							slideBox.style.marginLeft = '-' + itemMarginLeft + 'px';
							slideBox.style.marginRight = '-' + itemMarginRight + 'px';
							
							/*if(!sliderBlock.classList.contains('magic-slider-full-width') && slideBox.classList.contains('magic-slider-container-block')){
								slideBox.style.marginLeft = 0;
								slideBox.style.marginRight = 0;
							}*/
							
							// Элементы
							
							if(sliderTitle){
								
								
								if(!sliderBlock.classList.contains('magic-slider-full-width')){
									sliderTitle.style.width = slideWidth + 'px';
									sliderTitle.style.marginLeft = itemMarginLeft + 'px';
								}
								
								if(!sliderBlock.classList.contains('magic-slider-full-width') && slideBox.classList.contains('magic-slider-container-block')){
									sliderTitle.style.marginLeft = 0;
								}
								
								if(sliderBlock.classList.contains('magic-slider-full-width') && slideBox.classList.contains('magic-slider-container-block')){
									sliderTitle.style.width = slideWidth + 'px';
									sliderTitle.style.marginLeft = itemMarginLeft + 'px';
								}
							}
							
							let itemWidth = 0;
							
							let coefficient = 0;
							
							if(sliderBlock.classList.contains('magic-slider-middle') && decorWrap.getAttribute('data-media-source') !== 'media-xs'){
								itemWidth = slideWidth / 3 * 2;
								coefficient = itemWidth / 2
								
							} else if (sliderBlock.classList.contains('magic-slider-small') && decorWrap.getAttribute('data-media-source') !== 'media-xs'){
								itemWidth = slideWidth / 2;
								coefficient = itemWidth
							} else {
								itemWidth = slideWidth;
							}
							
							let slideItemMarginLeft = 0;
							
							slideItemMarginLeft = parseInt(getComputedStyle(slideItem[0]).marginLeft);
							
							//let itemGap = 0;
							
							for(let i = 0; i < slideItem.length - 1; i++){
								itemGap += parseInt(getComputedStyle(slideItem[i]).marginRight);
							}
							
							//console.log(itemGap)
							
							//если контейнер и не на всю ширину блок
							
							if(!sliderBlock.classList.contains('magic-slider-full-width') && slideBox.classList.contains('magic-slider-container-block')){
							
								itemWidth = itemWidth - slideItemMarginLeft;
								
							}
							
							//настройка максимальной ширины слайда чтобы высота слайда не превышала 78vh
							
							let itemMaxHeight = window.innerHeight * 0.78;
							let aspectRatio = 16 / 9;
							
							let itemMaxWidth = itemMaxHeight * aspectRatio;
							
							let itemsCountWidth = 0
							let itemMathWidth = 0;
							let itemCount = 0;
							
							function slideSheetTarget(){
								slider.addEventListener('click', function(event){
									
									if(event.target.classList.contains('magic-item-sheet-btn')){
										let sheetBtn = event.target;
										let itemSheetContainer = sheetBtn.closest('.magic-item-column-slide');
										let sheet = itemSheetContainer.querySelector('.magic-item-sheet');
										let sheetClose = itemSheetContainer.querySelector('.magic-item-sheet-close');
										let sheetContainer = itemSheetContainer.querySelector('.magic-item-column-text');
										let itemSheetImage = itemSheetContainer.querySelector('.magic-item-column-image');
										
										let sheetContainerHeight = sheetContainer.offsetHeight;
										sheetContainer.style.minHeight = sheetContainerHeight + 'px';
										sheet.classList.remove('hidden-text');
										itemSheetContainer.classList.add('active');
										itemSheetImage.style.opacity = 0;
										
										/*************************************/
										
										if(progress !== 0 && progress !== 1){
											let transformMatrix = window.getComputedStyle(slider).transform;
											let translateX = 0;
											
											if (transformMatrix !== 'none') {
											    const matrixValues = transformMatrix.match(/matrix\((.+)\)/)[1].split(', ');
											    translateX = parseFloat(matrixValues[4]); 
											}
											
											/*let progressStatus = Math.round(progress * 100);
											
											console.log(progressStatus)*/
											
											//let itemScrollAmount = translateX;
											
											let itemScrollAmount = 0;
											
											//let scrollWidth = sliderBlock.scene.duration();
											
											//console.log(itemScrollAmount)
											
											let rect = itemSheetContainer.getBoundingClientRect();
										    let leftDistance = rect.left; // Расстояние от левого края экрана
										    let rightDistance = window.innerWidth - rect.right; // Расстояние от правого края экрана
										
										    //console.log("Левый край: " + leftDistance + "px, Правый край: " + rightDistance + "px");
										    
										    let windowWidth = document.documentElement.clientWidth;
										    
										    //console.log("Ширина viewport " + windowWidth)
										    
										    let itemSheetContainerWidth = itemSheetContainer.offsetWidth;
										    
										    //console.log("Ширина слайда " + itemSheetContainerWidth)
										    
										    let itemSheetContainerCenter = (windowWidth - itemSheetContainerWidth) / 2
										    
										    //console.log("количество пикселей для центровки " + itemSheetContainerCenter)
										    //console.log("полоса прокрутки " + scrollWidth)
										    
										    if(leftDistance > rightDistance){
										    	itemScrollAmount = leftDistance - itemSheetContainerCenter;
										    	
										    	//console.log("нужно прокрутить вправо на " + itemScrollAmount)
										    } else if(rightDistance > leftDistance){
										    	
										    	itemScrollAmount = rightDistance - itemSheetContainerCenter
										    	itemScrollAmount = -itemScrollAmount
										    
										    	//console.log("нужно прокрутить влево на " + itemScrollAmount)
										    }
											
											//itemScrollAmount = itemSheetContainer.offsetWidth + parseInt(getComputedStyle(itemSheetContainer).marginRight);
											
											let itemsSheet = [...slider.children]; // Преобразуем в массив
											
											// Определяем, первый ли это элемент
									        /*if (itemsSheet[0] === itemSheetContainer) {
									            console.log('Это первый элемент:');
									        }*/
									        // Определяем, последний ли это элемент
									        /*if (itemsSheet[itemsSheet.length - 1] === itemSheetContainer) {
									            console.log('Это последний элемент:');
									        }*/
											
											
											window.scrollBy({ top: itemScrollAmount, left: 0, behavior: "smooth" });
											//console.log(itemScrollAmount)
										}
										
										/*************************************/
										
										sheetClose.addEventListener('click', function(event){
											sheetContainer.style.minHeight = 0;
											sheet.classList.add('hidden-text');
											itemSheetContainer.classList.remove('active');
											itemSheetImage.style.opacity = 1;
										});
										
										window.addEventListener('resize', function(){
											sheetContainer.style.minHeight = 0;
											sheet.classList.add('hidden-text');
											itemSheetContainer.classList.remove('active');
											itemSheetImage.style.opacity = 1;
										})
										
										document.addEventListener('click', function(e){
											if (!e.target.closest('.lp-prods-m-item')) {
												sheetContainer.style.minHeight = 0;
												sheet.classList.add('hidden-text');
												itemSheetContainer.classList.remove('active');
												itemSheetImage.style.opacity = 1;
											}
										});
									}
									
									
								});
							}
							
							slideSheetTarget()
							
							for(let i = 0; i < slideItem.length; i++){
								slideItem[i].style.width = itemWidth + 'px';
								slideItem[i].style.maxWidth = itemMaxWidth + 'px';
								
								
								let slideItemRow = slideItem[i].querySelector('.magic-slide-item-row');
									
								let slideItemRowHeight = slideItemRow.offsetHeight;
								
								let slideItemRowImage = slideItemRow.querySelector('.magic-item-column-image')
								let slideItemRowText = slideItemRow.querySelector('.magic-item-column-text')
								
								if (slideItemRowImage){
									let slideItemRowImageHeight = slideItemRowImage.offsetHeight;
									
									let newWidth = 0;
									
									if(decorWrap.getAttribute('data-media-source') === 'media-xs'){
									
										
										let slideItemRowTextTitle = slideItemRow.querySelector('.magic-item-column-text-title');
										let slideItemRowTextDesc = slideItemRow.querySelector('.magic-item-column-text-desc');
										let slideItemRowTextMobHeight = 0;
										
										if (slideItemRowTextTitle){
											let slideItemRowTextTitleHeight = slideItemRowTextTitle.offsetHeight;
											let slideItemRowTextTitleMargin = parseInt(getComputedStyle(slideItemRowTextTitle).marginBottom)
											
											slideItemRowTextMobHeight += slideItemRowTextTitleHeight + slideItemRowTextTitleMargin
										}
										
										if (slideItemRowTextDesc){
											let slideItemRowTextDescHeight = slideItemRowTextDesc.offsetHeight;
											
											slideItemRowTextMobHeight += slideItemRowTextDescHeight
											
										}
										
										if(slideItemRowImageHeight + slideItemRowTextMobHeight > slideItemRowHeight){
											
											while (slideItemRowImageHeight + slideItemRowTextMobHeight > slideItemRowHeight) {
												newWidth = slideItem[i].offsetWidth;
												slideItem[i].style.width = newWidth - 10 + "px";
												
												slideItemRowImageHeight = slideItemRowImage.offsetHeight;
												slideItemRowHeight = slideItemRow.offsetHeight;
												
												if(slideItemRowImageHeight + slideItemRowTextMobHeight <= slideItemRowHeight){
												
													break
												
												}
												
											}
										
										}
									
									
										
									} else {
									
										if(slideItemRowImageHeight > slideItemRowHeight){
											
											while (slideItemRowImageHeight > slideItemRowHeight) {
												newWidth = slideItem[i].offsetWidth;
												slideItem[i].style.width = newWidth - 10 + "px";
												
												slideItemRowImageHeight = slideItemRowImage.offsetHeight;
												slideItemRowHeight = slideItemRow.offsetHeight;
												
												if(slideItemRowImageHeight <= slideItemRowHeight){
												
													break
												
												}
												
											}
											
										}
									}
									
								}
								
								
								itemsCountWidth = itemsCountWidth + slideItem[i].offsetWidth;
								++itemCount;
								
								
							}
							
							
							itemMathWidth = itemsCountWidth / itemCount;
							
							
							
							if(sliderBlock.classList.contains('magic-slider-full-width')){
								
								let boxWidth = slideBox.clientWidth;
								sliderContainer.style.maxWidth = boxWidth + 'px';
							
								//scrollWidth = (itemMathWidth  * (slideCount - 1)) - (itemMargin * 2) + (slideItemMarginLeft * 2) + itemGap - coefficient - (itemWidth - itemMathWidth);
								
								scrollWidth = (itemMathWidth  * (slideCount - 1)) - (itemMarginLeft + itemMarginRight) + (slideItemMarginLeft * 2) + itemGap - coefficient - (itemWidth - itemMathWidth);
								
								
								if(slideBox.classList.contains('magic-slider-container-block')){
									
									let boxWidth = slideBox.clientWidth;
									sliderContainer.style.maxWidth = boxWidth + 'px';
									
									slideItem[0].style.marginLeft = itemMarginLeft + 'px';
									scrollWidth = itemMathWidth  * (slideCount - 1) + itemGap - coefficient - (itemWidth - itemMathWidth);
									
								}
								
							} else {
								
								/*if(!sliderBlock.classList.contains('magic-slider-full-width') && slideBox.classList.contains('magic-slider-container-block')){*/
								if(slideBox.classList.contains('magic-slider-container-block')){
								
									slideBox.style.marginLeft = 0;
									slideBox.style.marginRight = 0;
									
									let boxWidth = slideBox.clientWidth;
									
									sliderContainer.style.maxWidth = boxWidth + 'px';
									
									
									//scrollWidth = itemMathWidth  * (slideCount - 1) + itemGap - coefficient + (slideItemMarginLeft * 1);
									scrollWidth = itemMathWidth  * (slideCount - 1) + itemGap - coefficient - (itemWidth - itemMathWidth) + slideItemMarginLeft;
									
								
								} else {
									
									let boxWidth = slideBox.clientWidth;
									sliderContainer.style.maxWidth = boxWidth + 'px';
									
									slideItem[0].style.marginLeft = itemMarginLeft + 'px';
									scrollWidth = itemMathWidth  * (slideCount - 1) + itemGap - coefficient - (itemWidth - itemMathWidth);
									
								}
								
								
							}
					}		
					
					
					function sliderInitRemoveStyle(){
						slideBox.removeAttribute('style');
						
						if(sliderTitle) {
							sliderTitle.removeAttribute('style');
						}
						
						
						for(let i = 0; i < slideItem.length; i++){
							slideItem[i].removeAttribute('style');
						}
					}
					
					//тут был расчет ширины блоков, уехал на верх
					
					let controller = null; // Контроллер объявляем глобально
					let scene = null;
					
					destroySlider();
						
					function initSlider() {
						if(scrollWidth > 0) {
					
							controller = new ScrollMagic.Controller();
				    		sliderBlock.controller = controller;
				    		
				    		scene = new ScrollMagic.Scene({
						        triggerElement: sliderContainer,
						        duration: scrollWidth,
						        triggerHook: sliderTrigger,
						        offset: 0
						    })
						    .setPin(sliderContainer)
						    .on("progress", function (event) {
						        progress = event.progress;
						        let transformPos = Math.round(-scrollWidth * progress);
						        slider.style.transform = "translateX(" + transformPos + "px)";
						    })
						    .addTo(controller);
						
						    sliderBlock.scene = scene; // Сохраняем сцену
					    
					    } else {
					    	sliderContainer.style.height = 'auto';
					    }
					
					}
					
					
					// Функция для уничтожения слайдера
					function destroySlider() {
					    if (sliderBlock.controller) {
					        sliderBlock.controller.destroy(true);
					        sliderBlock.controller = null;
					        slider.style.transform = "translateX(" + 0 + ")";
					        scene = null;
					    }
					}
					
					
					// Функция для обработки изменений атрибута
					function handleAttributeChange() {
						
					    mediaSource = $('html').attr('data-media-source');
					    
					    if(sliderBlock.classList.contains('lp_scroll_disable')) {
					    	
					    	console.log("reg");
					
						    if (mediaSource === 'media-xs' || mediaSource === 'media-md' || mediaSource === 'media-sm') {
						    	
						    	sliderInitRemoveStyle()
						        destroySlider();
						    } else if (mediaSource === 'media-xl' || mediaSource === 'media-lg') {
						        if (!sliderBlock.controller) {
						        	sliderInitInter()
						            initSlider();
						        }
						    }
						    
						} else {
							if (!sliderBlock.controller) {
					            
					            if (mediaSource === 'media-xs') {
					            
					             	sliderInitInter()
					            	initSlider();
				            	
				            	} else if (mediaSource === 'media-xl' || mediaSource === 'media-lg' || mediaSource === 'media-md' || mediaSource === 'media-sm') {
				            		sliderInitInter()
					            	initSlider();
				            	}
					            
					        }
						}
					}
					
					// Запускаем наблюдатель за атрибутами
					let observer = new MutationObserver(handleAttributeChange);
					observer.observe(decorWrap, { attributes: true, attributeFilter: ['data-media-source'] });
					
					// Запускаем слайдер, если сразу mxledia-
					handleAttributeChange();
					
				}
	
				if (s3LP.is_cms){
					if(document.querySelector($sliderMagic)){	
						
						document.addEventListener('lp_init_after', function(){
							sliderInit($sliderMagic);
						});
						
						setTimeout(function(){
							sliderInit($sliderMagic);
						}, 1000)						
							
					}
					
				}else{
					document.addEventListener('lp_init_after', function() {
						
						var sliderSelector = $sliderMagic;
						var sliderEl = document.querySelector(sliderSelector);
						if (!sliderEl) return; // если блока нет — выходим
						
						var sliderInitialized = false;
						
						// Функция для инициализации слайдера (однократно)
						function initSlider() {
							if (!sliderInitialized) {
								sliderInit(sliderSelector);
								sliderInitialized = true;
								// Если инициализация требуется только один раз, можно убрать слушатель скролла:
								window.removeEventListener('scroll', scrollHandler);
							}
						}
						
						// Проверяем, виден ли блок или уже был показан (например, если мы перезагрузили страницу ниже блока)
						function checkVisibility() {
							var rect = sliderEl.getBoundingClientRect();
							// Если верхняя граница блока меньше высоты окна – значит, блок либо виден, либо уже прошёл мимо
							if (rect.top < window.innerHeight) {
								
								initSlider();
								
							}
						}
						
						function scrollHandler() {
							checkVisibility();
						}
						
						// При загрузке страницы проверяем видимость блока
						checkVisibility();
						// Если блок ещё не был показан, следим за прокруткой
						window.addEventListener('scroll', scrollHandler);
						
						// При изменении размеров окна перезапускаем слайдер (как в исходном варианте)
						window.addEventListener('resize', function(){
							setTimeout(function(){
								// Если слайдер уже был инициализирован – обновляем его,
								// если ещё нет – проверяем видимость блока
								if (sliderInitialized) {
									sliderInit(sliderSelector);
								} else {
									checkVisibility();
								}
							}, 500);
						});
					});
	
				
				}
				
				if ($(this).hasClass('lp-container-type')) {
					$(this).removeClass('lp-gap-full lp-prods-m__container lp-container-type');
					$(this).find('.magic-slider-container-block').addClass('lp-gap-full lp-prods-m__container lp-container-type');
				}
					
			});
		}
	}	
	
	lp_template.queue.tabsBlocks = function($self) {
		var $block = $self.find('.lp-js-tabs');
		if ($block.length) {
			$block.each(function() {
				let $this = $(this);
				var $tab = $this.find(".lp-tab-gallery__tab");
				var $tabs = $this.find(".lp-tab-gallery__tabs");
				var $item = $this.find(".lp-tab-gallery__image");
				
				if ($tabs.hasClass('_type-group') || $tabs.hasClass('_type-btn')) {
					$tab.first().find('.lp-button').addClass('lp-button--type-1');
					$tab.first().find('.lp-button').removeClass('lp-button--type-3');
					$tab.first().find('.lp-button').removeClass('lp-button--type-2');
					
					setTimeout(function() { 
					let lpcButtonType1 = $this.find('.lp-button--type-1'); 
        			let borderRadiusValue = lpcButtonType1.css('border-radius'); 
        
        			$('.lp-tab-gallery__tabs._type-group').css('border-radius', borderRadiusValue); 
					}, 50);
				}
				$tab.first().addClass('active');
			    $item.first().addClass('active');
			
						
			    $tab.on('click', function () {
			        const index = $(this).index(); 
			
			        $tab.removeClass('active');
			        
			        $item.removeClass('active');
			
			        $(this).addClass('active');
			        $item.eq(index).addClass('active');
			        if ($(this).closest('._type-group').length){
			        	if ($(this).hasClass('active')) {
			        		$(this).find('.lp-button').removeClass('lp-button--type-2', 'lp-button--type-3');
			        		$(this).find('.lp-button').addClass('lp-button--type-1');
			        		$(this).siblings('.lp-tab-gallery__tab').find('.lp-button').removeClass('lp-button--type-1');
			        		$(this).siblings('.lp-tab-gallery__tab').find('.lp-button').addClass('lp-button--type-2', 'lp-button--type-3');
			        	}
			        }
			        if ($(this).closest('._type-btn').length){
			        	if ($(this).hasClass('active')) {
			        		$(this).find('.lp-button').removeClass('lp-button--type-2');
			        		$(this).find('.lp-button').addClass('lp-button--type-1');
			        		$(this).siblings('.lp-tab-gallery__tab').find('.lp-button').removeClass('lp-button--type-1');
			        		$(this).siblings('.lp-tab-gallery__tab').find('.lp-button').addClass('lp-button--type-2');
			        	}
			        }
				});
			});	
		}
	};
	
	
	let bgWatchers = {};
	
	lp_template.queue.lpcDecorText = function($self) {
		var $block = $self.hasClass('lpc-elements-dynamic-headline') ? $self : $self.find('.lpc-elements-dynamic-headline');
		
		function initHeadline() {
			if($block.length) {
				$block.each(function () {
					let $item = $(this);
					let $itemId = $item.attr('id');
					let $title = `#${$itemId} .lpc-elements-dynamic-headline__title`;
					let $titleInit = `#${$itemId} .lpc-dynamic-title-init`;
					let $bgItem = `#${$itemId} .lp-block-bg_item`;
					let $overlayItem = `#${$itemId} .lp-block-overlay_item`;
					

					dynamicTextWidth($titleInit, $title);

					if (document.querySelector($title) && document.querySelector($title).classList.contains('bg_clip')) {
						dynamicTextBg($titleInit, $title, $bgItem, $overlayItem);
					};

					let observerTitle = bindObserver($title, $titleInit, $bgItem, $overlayItem);


					// Отслеживание изменений фона
					if (document.querySelector($title) && document.querySelector($title).classList.contains('bg_clip')) {
						let bgPrev, ovPrev;

						if (bgWatchers[$itemId]) {
						    clearInterval(bgWatchers[$itemId]);
						}
						
						bgWatchers[$itemId] = setInterval(() => {
						    const t = document.querySelector($title);
						    if (!t || !t.classList.contains('bg_clip')) return;
						
						    const bg = document.querySelector($bgItem);
						    const ov = document.querySelector($overlayItem);
						    if (!bg || !ov) return;
						
						    const bgNow = getComputedStyle(bg).background;
						    const ovNow = getComputedStyle(ov).background;
						
						    if ((bgPrev && bgPrev !== bgNow) || (ovPrev && ovPrev !== ovNow)) {
						        dynamicTextBg($titleInit, $title, $bgItem, $overlayItem);
						    }
						
						    bgPrev = bgNow;
						    ovPrev = ovNow;
						}, 300);
					};
					
					$(document).on('click', '#publish_button, #cancel_all_button, .clear-control', function() {
					    setTimeout(function () {
					        // пересчёт размера
					        dynamicTextWidth($titleInit, $title);

							// проверка фона
							dynamicTextBg($titleInit, $title, $bgItem, $overlayItem);
					
					        // перезапуск наблюдения
					        if (observerTitle) observerTitle.disconnect();
							observerTitle = bindObserver($title, $titleInit, $bgItem, $overlayItem);
					    }, 50);
					});


					// Для ЛПЦ
					function waitForStylesheet(callback, delay = 500) {
						const interval = setInterval(() => {
							if (document.getElementById('lpc-stylesheet')) {
								clearInterval(interval);
								setTimeout(callback, delay);
							}
						}, 250);
					}
	
					waitForStylesheet(() => {
						dynamicTextWidth($titleInit, $title);
					}, 500);
					
					if (!s3LP.is_cms) {
						let initTimeout;
						
						$(window).on('resize', function(){
							clearInterval(initTimeout);
	
							initTimeout = setTimeout(function(){
								dynamicTextWidth($titleInit, $title);
	
								if (document.querySelector($title) && document.querySelector($title).classList.contains('bg_clip')) {
									dynamicTextBg($titleInit, $title, $bgItem, $overlayItem);
								};
							}, 50);
						});
					};
				});
			}
		};

		function bindObserver($title, $titleInit, $bgItem, $overlayItem) {
		    let contentTitle = document.querySelector($title);
		    if (!contentTitle) return;
		
		    let observerTitle = new MutationObserver((mutations) => {
		        mutations.forEach((mutation) => {
		            if ($(mutation.target).closest('.lpc-dynamic-title-init').length) {
		
		                if (mutation.type === "characterData" || mutation.type === "childList") {
		                    dynamicTextWidth($titleInit, $title);

		                    setTimeout(function () {
		                        let el = document.querySelector($title);
		                        if (el && el.classList.contains('bg_clip')) {
		                            dynamicTextBg($titleInit, $title, $bgItem, $overlayItem);
		                        }
		                    }, 100);
		                }
		            }
		        });
		    });
		
		    observerTitle.observe(contentTitle, {
		        childList: true,
		        subtree: true,
		        characterData: true
		    });
		
		    return observerTitle;
		};
		
		function dynamicTextWidth(parent, child) {
		    let $dynamicWrap = $(parent);
		    let $dynamicTitle = $(child);
		
		    let dynamicTitleMinSize = 2;
		    let dynamicTitleMaxSize = 55;
		
		    function isMobile() {
		        return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
		            || window.matchMedia("(max-width: 768px)").matches;
		    }
		
		    if (isMobile()) {
		        dynamicTitleMinSize = 4.2;
		    } else {
		        if ($dynamicWrap.hasClass('lpc-full-width-init')) {
		            dynamicTitleMinSize = 3.2;
		        } else {
		            dynamicTitleMinSize = 2;
		        }
		    }
		
		    // Для центрирования блока если полная ширина
		    if ($dynamicWrap.hasClass('lpc-full-width-init')) {
		        let $dynamicBlockWrap = $dynamicWrap.closest('.lpc-full-width');
		        let $dynamicBlockIn = $dynamicWrap.closest('.lpc-elements-dynamic-headline__wrap');
		        let viewportWidth = $(window).width();
		        let dynamicWrapMargin = (viewportWidth - $dynamicBlockWrap.outerWidth()) / 2;
		
		        $dynamicBlockIn.css({
		            'margin-left': `-${dynamicWrapMargin}px`,
		            'margin-right': `-${dynamicWrapMargin}px`
		        });
		    }
		
		    let min = dynamicTitleMinSize;
		    let max = dynamicTitleMaxSize;
		    let attempts = 0;
		    let maxAttempts = 20; // защита от проклятий
		
		    $dynamicTitle.css('white-space', 'nowrap');
		
		    while (attempts < maxAttempts) {
		        let mid = (min + max) / 2;
		        $dynamicTitle.css('font-size', mid + 'vw');
		
		        if ($dynamicTitle.outerWidth() > $dynamicWrap.outerWidth()) {
		            max = mid;  // слишком большой размер
		        } else {
		            min = mid;  // можно попробовать больше
		        }
		
		        attempts++;
		    }
		
		    $dynamicTitle.css('font-size', min + 'vw');
		    $dynamicTitle.css('opacity', 1);
		
		    // Если крошечный текст — ворочаем переносы
		    if (min <= dynamicTitleMinSize + 0.2) {
		        $dynamicTitle.css('white-space', 'normal');
		    }
		};


		function dynamicTextBg(parent, child, overlays, overlayItem) {
		    if (document.querySelector(parent)) {
		        let dynamicWrap = document.querySelector(parent);
		        let dynamicTitle = dynamicWrap.querySelector(child);
		
		        let titleOverlays = dynamicWrap.querySelectorAll(overlays);
		        let titleOverlayLast = titleOverlays[titleOverlays.length - 1]
		        let titleOverlayItem = titleOverlayLast.querySelector(overlayItem);
		
		        if (titleOverlayLast) {
		
		            let titleOverlayItemBg = getComputedStyle(titleOverlayItem).backgroundImage;
		            let titleOverlayItemBgCol = getComputedStyle(titleOverlayItem).backgroundColor;
		            let titleOverlayLastBg = getComputedStyle(titleOverlayLast).backgroundImage;
		
		
		            if (titleOverlayItemBg !== 'none') {
		
		                let computedStyles = window.getComputedStyle(titleOverlayLast);
		
		                let bgProperties = [
		                    'background-image',
		                    'background-position',
		                    'background-size',
		                    'background-repeat',
		                    'background-attachment'
		                ];
		
		                bgProperties.forEach(function (properties) {
		                    dynamicTitle.style[properties] = computedStyles.getPropertyValue(properties);
		
		                })
		
		                dynamicTitle.style.backgroundImage = titleOverlayItemBg + ', ' + titleOverlayLastBg;
		
		            } else if (titleOverlayItemBgCol !== 'transparent' && titleOverlayItemBgCol !== 'rgba(0, 0, 0, 0)' && titleOverlayItemBgCol !== 'rgba(255, 255, 255, 0)') {
		
		                let computedStyles = window.getComputedStyle(titleOverlayLast);
		
		
		                let bgProperties = [
		                    'background-image',
		                    'background-position',
		                    'background-size',
		                    'background-repeat',
		                    'background-attachment'
		                ];
		
		                bgProperties.forEach(function (properties) {
		                    if (bgProperties !== 'background-image') {
		                        dynamicTitle.style[properties] = computedStyles.getPropertyValue(properties);
		                    }
		                })
		
		                dynamicTitle.style.backgroundImage = 'linear-gradient(to right,' + titleOverlayItemBgCol + ', ' + titleOverlayItemBgCol + ')' + ', ' + titleOverlayLastBg;
		
		            } else if ((titleOverlayItemBgCol === 'transparent' || titleOverlayItemBgCol === 'rgba(0, 0, 0, 0)') && titleOverlayLastBg === 'none') {
		
		                let rootStyles = getComputedStyle(document.documentElement); // :root стили
		                let bgColor = rootStyles.getPropertyValue('--text-color-base').trim();
		
		                dynamicTitle.style.backgroundColor = bgColor;
		                dynamicTitle.style.backgroundImage = 'none';
		
		
		            } else {
		
		                let computedStyles = window.getComputedStyle(titleOverlayLast);
		                let bgProperties = [
		                    'background-image',
		                    'background-position',
		                    'background-size',
		                    'background-repeat',
		                    'background-attachment'
		                ];
		
		                bgProperties.forEach(function (properties) {
		                    if (bgProperties !== 'background-image') {
		                        dynamicTitle.style[properties] = computedStyles.getPropertyValue(properties);
		                    }
		
		                    let value = computedStyles.getPropertyValue(properties);
		                    if (properties === 'background-image' && value === 'none') {
		                        dynamicTitle.style.removeProperty('background-image');
		                    }
		                })
		            }
		
		            if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
		                dynamicTitle.style.backgroundAttachment = 'scroll';
		            }
		        }
		    }
		};
	
		document.addEventListener("lp_init_after", function () {
			if (s3LP.is_cms) {
				initHeadline();
			};
		});
	};
	
	
	/*lp_template.queue.lpcDecorText = function($self) {
		var $block = $self.hasClass('lpc-elements-dynamic-headline') ? $self : $self.find('.lpc-elements-dynamic-headline');
		
		function initHeadline() {
			if($block.length) {
				$block.each(function () {
					let $item = $(this);
					let $itemId = $item.attr('id');
					let $title = `#${$itemId} .lpc-elements-dynamic-headline__title`;
					let $titleInit = `#${$itemId} .lpc-dynamic-title-init`;
					let $bgItem = `#${$itemId} .lp-block-bg_item`;
					let $overlayItem = `#${$itemId} .lp-block-overlay_item`;
	
					dynamicTextWidth($titleInit, $title);

					if (document.querySelector($title) && document.querySelector($title).classList.contains('bg_clip')) {
						dynamicTextBg($titleInit, $title, $bgItem, $overlayItem);
					};
	
					// Меняем размер после изменения текста
					let contentTitle = document.querySelector($title);
					let observerTitle = new MutationObserver((mutations) => {
						
						mutations.forEach((mutation) => {
							if ($(mutation.target).parents('.lpc-elements-dynamic-headline__title').length) {
								if (mutation.type === "characterData" || mutation.type === "childList") {
									dynamicTextWidth($titleInit, $title);
									
									setTimeout(function(){
										if (document.querySelector($title) && document.querySelector($title).classList.contains('bg_clip')) {
											dynamicTextBg($titleInit, $title, $bgItem, $overlayItem);
										}
									}, 100);
								}									
							}
						});
					});
	
					observerTitle.observe(contentTitle, {
						childList: true,
						subtree: true,
						//attributes: true,
						characterData: true
					});
					
					
					$(document).on('click', '.publish-button', function() {
						setTimeout(function(){
							dynamicTextWidth($titleInit, $title);
						
							if (document.querySelector($title) && document.querySelector($title).classList.contains('bg_clip')) {
								dynamicTextBg($titleInit, $title, $bgItem, $overlayItem);
							}
						}, 0);
					});
					
					$(document).on('click', '#cancel_all_button', function() {
						setTimeout(function(){
							dynamicTextWidth($titleInit, $title);
						
							if (document.querySelector($title) && document.querySelector($title).classList.contains('bg_clip')) {
								dynamicTextBg($titleInit, $title, $bgItem, $overlayItem);
							}
						}, 0);
					});
					
					$(document).on('click', '.clear-control', function() {
						setTimeout(function(){
							dynamicTextWidth($titleInit, $title);
						
							if (document.querySelector($title) && document.querySelector($title).classList.contains('bg_clip')) {
								dynamicTextBg($titleInit, $title, $bgItem, $overlayItem);
							}
						}, 0);
					});
					
					if (!s3LP.is_cms) {
						let initTimeout;
						
						$(window).on('resize', function(){
							clearInterval(initTimeout);
	
							initTimeout = setTimeout(function(){
								dynamicTextWidth($titleInit, $title);
	
								if (document.querySelector($title) && document.querySelector($title).classList.contains('bg_clip')) {
									dynamicTextBg($titleInit, $title, $bgItem, $overlayItem);
								};
							}, 50);
						});
					};
				});
			}
		};
	
		function dynamicTextWidth(parent, child) {
			let $dynamicWrap = $(parent);
			let $dynamicTitle = $(child);
			let dynamicTitleFontSize = parseFloat($dynamicTitle.css('font-size'));
			let dynamicTitleFontSizeVW = (dynamicTitleFontSize / $(window).width()) * 100;
			let dynamicTitleMinSize = 3.2;
			let dynamicTitleMaxSize = 55;
	
			function isMobile() {
				return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
					|| window.matchMedia("(max-width: 768px)").matches;
			};
	
			if (isMobile()) {
				dynamicTitleMinSize = 4.2;
			} else {
				if ($dynamicWrap.hasClass('lpc-full-width-init')) {
					dynamicTitleMinSize = 3.2;
				} else {
					dynamicTitleMinSize = 2;
				}
			}
		
			if ($dynamicWrap.hasClass('lpc-full-width-init')) {
				let $dynamicBlockWrap = $dynamicWrap.closest('.lpc-full-width');
				let $dynamicBlockIn = $dynamicWrap.closest('.lpc-elements-dynamic-headline__wrap');
				let viewportWidth = $(window).width();
				let dynamicWrapMargin = (viewportWidth - $dynamicBlockWrap.outerWidth()) / 2;
	
				$dynamicBlockIn.css({
					'margin-left': '-' + dynamicWrapMargin + 'px',
					'margin-right': '-' + dynamicWrapMargin + 'px'
				});
			}
	
			if ($dynamicWrap.outerWidth() > $dynamicTitle.outerWidth()) {
				while ($dynamicWrap.outerWidth() > $dynamicTitle.outerWidth()) {
					dynamicTitleFontSizeVW = dynamicTitleFontSizeVW + 0.05;
					$dynamicTitle.css('font-size', dynamicTitleFontSizeVW + 'vw');
					$dynamicTitle.css('white-space', 'nowrap');
					if (dynamicTitleFontSizeVW >= dynamicTitleMaxSize) {
						break;
					}
				}
	
				$dynamicTitle.css('font-size', (dynamicTitleFontSizeVW - 0.05) + 'vw')
					.css('opacity', 1);
	
				if (dynamicTitleFontSizeVW <= dynamicTitleMinSize) {
					$dynamicTitle.css('font-size', dynamicTitleMinSize + 'vw');
					$dynamicTitle.css('white-space', 'normal');
				}
	
				return;
			}
	
			if ($dynamicWrap.outerWidth() <= $dynamicTitle.outerWidth()) {
				while ($dynamicWrap.outerWidth() <= $dynamicTitle.outerWidth()) {
					dynamicTitleFontSizeVW = dynamicTitleFontSizeVW - 0.05;
					$dynamicTitle.css('font-size', dynamicTitleFontSizeVW + 'vw');
					$dynamicTitle.css('white-space', 'nowrap');
	
					if (dynamicTitleFontSizeVW <= dynamicTitleMinSize) {
						break;
					}
				}
	
				$dynamicTitle.css('opacity', 1);
	
				if (dynamicTitleFontSizeVW <= dynamicTitleMinSize) {
					$dynamicTitle.css('font-size', dynamicTitleMinSize + 'vw');
					$dynamicTitle.css('white-space', 'normal');
				}
	
				return;
			}
	
			$dynamicTitle.css('opacity', 1);
			
			return;
		};

		function dynamicTextBg(parent, child, overlays, overlayItem) {
		    if (document.querySelector(parent)) {
		        let dynamicWrap = document.querySelector(parent);
		        let dynamicTitle = dynamicWrap.querySelector(child);
		
		        let titleOverlays = dynamicWrap.querySelectorAll(overlays);
		        let titleOverlayLast = titleOverlays[titleOverlays.length - 1]
		        let titleOverlayItem = titleOverlayLast.querySelector(overlayItem);
		
		        if (titleOverlayLast) {
		
		            let titleOverlayItemBg = getComputedStyle(titleOverlayItem).backgroundImage;
		            let titleOverlayItemBgCol = getComputedStyle(titleOverlayItem).backgroundColor;
		            let titleOverlayLastBg = getComputedStyle(titleOverlayLast).backgroundImage;
		
		
		            if (titleOverlayItemBg !== 'none') {
		
		                let computedStyles = window.getComputedStyle(titleOverlayLast);
		
		                let bgProperties = [
		                    'background-image',
		                    'background-position',
		                    'background-size',
		                    'background-repeat',
		                    'background-attachment'
		                ];
		
		                bgProperties.forEach(function (properties) {
		                    dynamicTitle.style[properties] = computedStyles.getPropertyValue(properties);
		
		                })
		
		                dynamicTitle.style.backgroundImage = titleOverlayItemBg + ', ' + titleOverlayLastBg;
		
		            } else if (titleOverlayItemBgCol !== 'transparent' && titleOverlayItemBgCol !== 'rgba(0, 0, 0, 0)' && titleOverlayItemBgCol !== 'rgba(255, 255, 255, 0)') {
		
		                let computedStyles = window.getComputedStyle(titleOverlayLast);
		
		
		                let bgProperties = [
		                    'background-image',
		                    'background-position',
		                    'background-size',
		                    'background-repeat',
		                    'background-attachment'
		                ];
		
		                bgProperties.forEach(function (properties) {
		                    if (bgProperties !== 'background-image') {
		                        dynamicTitle.style[properties] = computedStyles.getPropertyValue(properties);
		                    }
		                })
		
		                dynamicTitle.style.backgroundImage = 'linear-gradient(to right,' + titleOverlayItemBgCol + ', ' + titleOverlayItemBgCol + ')' + ', ' + titleOverlayLastBg;
		
		            } else if ((titleOverlayItemBgCol === 'transparent' || titleOverlayItemBgCol === 'rgba(0, 0, 0, 0)') && titleOverlayLastBg === 'none') {
		
		                let rootStyles = getComputedStyle(document.documentElement); // :root стили
		                let bgColor = rootStyles.getPropertyValue('--text-color-base').trim();
		
		                dynamicTitle.style.backgroundColor = bgColor;
		                dynamicTitle.style.backgroundImage = 'none';
		
		
		            } else {
		
		                let computedStyles = window.getComputedStyle(titleOverlayLast);
		                let bgProperties = [
		                    'background-image',
		                    'background-position',
		                    'background-size',
		                    'background-repeat',
		                    'background-attachment'
		                ];
		
		                bgProperties.forEach(function (properties) {
		                    if (bgProperties !== 'background-image') {
		                        dynamicTitle.style[properties] = computedStyles.getPropertyValue(properties);
		                    }
		
		                    let value = computedStyles.getPropertyValue(properties);
		                    if (properties === 'background-image' && value === 'none') {
		                        dynamicTitle.style.removeProperty('background-image');
		                    }
		                })
		            }
		
		            if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
		                dynamicTitle.style.backgroundAttachment = 'scroll';
		            }
		        }
		    }
		};
	
		document.addEventListener("lp_init_after", function () {
			if (s3LP.is_cms) {
				initHeadline();
			};
		});
	};*/
	
	
	/*lp_template.queue.lpcDecorText = function ($self) {
		const paramsGet = new URLSearchParams(window.location.search);
		if(paramsGet.has('lpc_test')){
			var $block = $self.hasClass('lpc-elements-dynamic-headline') ? $self : $self.find('.lpc-elements-dynamic-headline');
			
			if($block.length) {
				
				$block.each(function () {
					
					let $item = $(this);
					let $itemId = $item.attr('id');
		
					let $title = `#${$itemId} .lpc-elements-dynamic-headline__title`;
					let $titleInit = `#${$itemId} .lpc-dynamic-title-init`;
					let $bgItem = `#${$itemId} .lp-block-bg_item`;
					let $overlayItem = `#${$itemId} .lp-block-overlay_item`;
					
					function dynamicTextBg(parent, child, overlays, overlayItem){
						if(document.querySelector(parent)){
							let dynamicWrap = document.querySelector(parent);
							let dynamicTitle = dynamicWrap.querySelector(child);
							
							let titleOverlays = dynamicWrap.querySelectorAll(overlays);
							let titleOverlayLast = titleOverlays[titleOverlays.length - 1]
							let titleOverlayItem = titleOverlayLast.querySelector(overlayItem);
						
							if (titleOverlayLast) {
								
								let titleOverlayItemBg = getComputedStyle(titleOverlayItem).backgroundImage;
								let titleOverlayItemBgCol = getComputedStyle(titleOverlayItem).backgroundColor;				
								let titleOverlayLastBg = getComputedStyle(titleOverlayLast).backgroundImage;
							
								
								if(titleOverlayItemBg !== 'none'){
									
									let computedStyles = window.getComputedStyle(titleOverlayLast);
		
									let bgProperties = [
									    'background-image',
									    'background-position',
									    'background-size',
									    'background-repeat',
									    'background-attachment'
									];
		
									bgProperties.forEach(function(properties){
										dynamicTitle.style[properties] = computedStyles.getPropertyValue(properties);
										
									})
									
									dynamicTitle.style.backgroundImage = titleOverlayItemBg + ', ' + titleOverlayLastBg;
									
								} else if(titleOverlayItemBgCol !== 'transparent' && titleOverlayItemBgCol !== 'rgba(0, 0, 0, 0)' && titleOverlayItemBgCol !== 'rgba(255, 255, 255, 0)'){
									
									let computedStyles = window.getComputedStyle(titleOverlayLast);
		
								
									let bgProperties = [
									    'background-image',
									    'background-position',
									    'background-size',
									    'background-repeat',
									    'background-attachment'
									];
									
									bgProperties.forEach(function(properties){
										if(bgProperties !== 'background-image'){
											dynamicTitle.style[properties] = computedStyles.getPropertyValue(properties);
										}
									})
									
									dynamicTitle.style.backgroundImage = 'linear-gradient(to right,' + titleOverlayItemBgCol + ', ' + titleOverlayItemBgCol + ')' + ', ' + titleOverlayLastBg;
									
								} else if((titleOverlayItemBgCol === 'transparent' || titleOverlayItemBgCol === 'rgba(0, 0, 0, 0)') && titleOverlayLastBg === 'none') {
								
									let rootStyles = getComputedStyle(document.documentElement); // :root стили
									let bgColor = rootStyles.getPropertyValue('--text-color-base').trim();
									
									dynamicTitle.style.backgroundColor = bgColor;
									dynamicTitle.style.backgroundImage = 'none';
									
									
								} else {
								
									let computedStyles = window.getComputedStyle(titleOverlayLast);
									let bgProperties = [
									    'background-image',
									    'background-position',
									    'background-size',
									    'background-repeat',
									    'background-attachment'
									];
									
									bgProperties.forEach(function(properties){
										if(bgProperties !== 'background-image'){
											dynamicTitle.style[properties] = computedStyles.getPropertyValue(properties);
										}	
		
										let value = computedStyles.getPropertyValue(properties);
										if (properties === 'background-image' && value === 'none') {
											dynamicTitle.style.removeProperty('background-image');
										}
									})
								}
								
								if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
								    dynamicTitle.style.backgroundAttachment = 'scroll';
								}	
							}
						}
					}
					
					function dynamicTextWidth(parent, child){
						if(typeof ReactLPConstructor == 'object'){
							if ($(parent).length && $(parent).find(child).length) {
						    let $dynamicWrap = $(parent);
						    let $dynamicTitle = $dynamicWrap.find(child);
						    let dynamicTitleFontSize = parseFloat($dynamicTitle.css('font-size'));
						    let dynamicTitleFontSizeVW = (dynamicTitleFontSize / $(window).width()) * 100;
						
						    let dynamicTitleMinSize = 3.2;
						    let dynamicTitleMaxSize = 55;
						
						    function isMobile() {
						        return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent) 
						            || window.matchMedia("(max-width: 768px)").matches;
						    }
						
						    if (isMobile()) {
						        dynamicTitleMinSize = 4.2;
						    } else {
						        if ($dynamicWrap.hasClass('lpc-full-width-init')) {
						            dynamicTitleMinSize = 3.2;
						        } else {
						            dynamicTitleMinSize = 2;
						        }
						    }
						
						    if ($dynamicWrap.hasClass('lpc-full-width-init')) {
						        let $dynamicBlockWrap = $dynamicWrap.closest('.lpc-full-width');
						        let $dynamicBlockIn = $dynamicWrap.closest('.lpc-elements-dynamic-headline__wrap');
						        let viewportWidth = $(window).width();
						        let dynamicWrapMargin = (viewportWidth - $dynamicBlockWrap.outerWidth()) / 2;
						
						        $dynamicBlockIn.css({
						            'margin-left': '-' + dynamicWrapMargin + 'px',
						            'margin-right': '-' + dynamicWrapMargin + 'px'
						        });
						    }
						
						    if ($dynamicWrap.outerWidth() > $dynamicTitle.outerWidth()) {
						        while ($dynamicWrap.outerWidth() > $dynamicTitle.outerWidth()) {
						            dynamicTitleFontSizeVW = dynamicTitleFontSizeVW + 0.05;
						            $dynamicTitle.css('font-size', dynamicTitleFontSizeVW + 'vw');
						            if (dynamicTitleFontSizeVW >= dynamicTitleMaxSize) {
						                break;
						            }
						        }
						
						        $dynamicTitle.css('font-size', (dynamicTitleFontSizeVW - 0.05) + 'vw')
						                     .css('opacity', 1);
						
						        if (dynamicTitleFontSizeVW <= dynamicTitleMinSize) {
						            $dynamicTitle.css('font-size', dynamicTitleMinSize + 'vw');
						        }
						
						        return;
						    }
						
						    if ($dynamicWrap.outerWidth() <= $dynamicTitle.outerWidth()) {
						        while ($dynamicWrap.outerWidth() <= $dynamicTitle.outerWidth()) {
						            dynamicTitleFontSizeVW = dynamicTitleFontSizeVW - 0.05;
						            $dynamicTitle.css('font-size', dynamicTitleFontSizeVW + 'vw');
						
						            if (dynamicTitleFontSizeVW <= dynamicTitleMinSize) {
						                break;
						            }
						        }
						
						        $dynamicTitle.css('opacity', 1);
						
						        if (dynamicTitleFontSizeVW <= dynamicTitleMinSize) {
						            $dynamicTitle.css('font-size', dynamicTitleMinSize + 'vw');
						        }
						
						        return;
						    }
						
						    $dynamicTitle.css('opacity', 1);
						    return;
						}

						}else {
							if(document.querySelector(parent) && document.querySelector(child)){
							
							let dynamicWrap = document.querySelector(parent);
							let dynamicTitle = dynamicWrap.querySelector(child);
							let dynamicTitleFontSize = parseFloat(getComputedStyle(dynamicTitle).fontSize);
							let dynamicTitleFontSizeVW = (dynamicTitleFontSize / window.innerWidth) * 100;
						
							let dynamicTitleMInSize = 3.2;
							let dynamicTitleMaxSize = 55;
							
							function isMobile() {
							    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent) || window.matchMedia("(max-width: 768px)").matches;
							}
							
							if (isMobile()) {
							    dynamicTitleMInSize = 4.2;
							} else {
								
								if(dynamicWrap.classList.contains('lpc-full-width-init')){
									dynamicTitleMInSize = 3.2;
								} else {
							    	dynamicTitleMInSize = 2;
							    }
							}
							
							
							if (dynamicWrap.classList.contains('lpc-full-width-init')) {
								let dynamicBlockWrap = dynamicWrap.closest('.lpc-full-width');
								let dynamicBlockIn = dynamicWrap.closest('.lpc-elements-dynamic-headline__wrap');				
								let viewportWidth = $(window).width();
								let dynamicWrapMargin = (viewportWidth - dynamicBlockWrap.offsetWidth) / 2;
		
								$(dynamicBlockIn).css({
								    'margin-left': '-' + (dynamicWrapMargin) + 'px',
								    'margin-right': '-' + (dynamicWrapMargin) + 'px'
								});
							}
							
							
							if(dynamicWrap.offsetWidth > dynamicTitle.offsetWidth){
								while (dynamicWrap.offsetWidth > dynamicTitle.offsetWidth) {
									dynamicTitleFontSizeVW = dynamicTitleFontSizeVW + 0.05;
									dynamicTitle.style.fontSize = dynamicTitleFontSizeVW + 'vw';
									if(dynamicTitleFontSizeVW >= dynamicTitleMaxSize){
										break;
									}
								}
								
								dynamicTitle.style.fontSize = (dynamicTitleFontSizeVW - 0.05) + 'vw';			
								dynamicTitle.style.opacity = 1;
								
								if(dynamicTitleFontSizeVW <= dynamicTitleMInSize){
									dynamicTitle.style.fontSize = dynamicTitleMInSize + 'vw';
								}
								
								return;
							}
							
							if(dynamicWrap.offsetWidth <= dynamicTitle.offsetWidth){
							
								while(dynamicWrap.offsetWidth <= dynamicTitle.offsetWidth) {
									dynamicTitleFontSizeVW = dynamicTitleFontSizeVW - 0.05;
									
									dynamicTitle.style.fontSize = dynamicTitleFontSizeVW + 'vw';
									
									
									if(dynamicTitleFontSizeVW <= dynamicTitleMInSize){
										break;
									}
								}
								dynamicTitle.style.opacity = 1;
								
								if(dynamicTitleFontSizeVW <= dynamicTitleMInSize){
									dynamicTitle.style.fontSize = dynamicTitleMInSize + 'vw';
								}
								
								return;
							}
							
							dynamicTitle.style.opacity = 1;
							
							return;
						}
						}
						
						
						
					}
		
					if (s3LP.is_cms) {
						
					    if (document.querySelector(`${$titleInit} .lpc-elements-dynamic-headline__title`)) {
							
					        document.addEventListener("lp_init_after", function () {
					            setTimeout(function () {
					                dynamicTextWidth($titleInit, $title);
					                
		
					                if (document.querySelector($title) && document.querySelector($title).classList.contains('bg_clip')) {
					                	
					                    dynamicTextBg($titleInit, $title, $bgItem, $overlayItem);
					                    
					                }
		
					            }, 1000);
		
					            function waitForStylesheet(callback, delay = 500) {
					                const interval = setInterval(() => {
					                    if (document.getElementById('lpc-stylesheet')) {
					                        clearInterval(interval);
					                        setTimeout(callback, delay);
					                    }
					                }, 250);
					            }
		
					            waitForStylesheet(() => {
					                dynamicTextWidth($titleInit, $title);
					            }, 500);
					        });
		
					        // Watch bg and overlay style changes
					        if (document.querySelector($title) && document.querySelector($title).classList.contains('bg_clip')) {
					            let elementBg = document.querySelector($bgItem);
					            let elementOverlay = document.querySelector($overlayItem);
		
					            let observerBg = new MutationObserver((mutationsList) => {
					                mutationsList.forEach((mutation) => {
					                    if (mutation.type === "attributes" && mutation.attributeName === "style") {
					                        dynamicTextBg($titleInit, $title, $bgItem, $overlayItem);
					                    }
					                });
					            });
		
					            let config = {
					                attributes: true,
					                attributeFilter: ["style"]
					            };
		
					            observerBg.observe(elementBg, config);
					            observerBg.observe(elementOverlay, config);
					        }
		
					        // Watch text content changes
					        let contentTitle = document.querySelector($title);
		
					        let observerTitle = new MutationObserver((mutations) => {
					            mutations.forEach((mutation) => {
					                dynamicTextWidth($titleInit, $title);
					            });
					        });
		
					        observerTitle.observe(contentTitle, {
					            childList: true,
					            subtree: true,
					            characterData: true
					        });
		
					        // On style removed (eraser)
					        function observeStyleChanges(targetSelector, dynamicFunction) {
					            let targetTitle = document.querySelector(targetSelector);
		
					            if (!targetTitle) return;
		
					            const observerBlock = new MutationObserver((mutationsList) => {
					                for (const mutation of mutationsList) {
					                    if (mutation.type === "attributes" && mutation.attributeName === "style") {
					                        if (!targetTitle.getAttribute("style")) {
					                            dynamicFunction();
					                        }
					                    }
					                }
					            });
		
					            observerBlock.observe(targetTitle, {
					                attributes: true,
					                attributeFilter: ["style"]
					            });
		
					            dynamicFunction();
					        }
		
					        observeStyleChanges(
					            $title,
					            () => dynamicTextWidth($titleInit, $title)
					        );
		
					        // On publish
					        const targetElement = document.querySelector($title);
		
					        if (targetElement) {
					            const observer = new MutationObserver((mutationsList) => {
					                mutationsList.forEach((mutation) => {
					                    if (mutation.type === "attributes" && mutation.attributeName === "class") {
					                        if (!targetElement.classList.contains("modified")) {
					                            setTimeout(function () {
					                                dynamicTextWidth($titleInit, $title);
					                                
					                                if (document.querySelector($title) && document.querySelector($title).classList.contains('bg_clip')) {
					                                    dynamicTextBg($titleInit, $title, $bgItem, $overlayItem);
					                                }
					                            }, 2000);
					                        }
					                    }
					                });
					            });
		
					            observer.observe(targetElement, { attributes: true });
					        }
		
					    }
		
					} else {
		
					    function observeElementWithClass(targetClass) {
					        let widthTitleObserver = new MutationObserver((mutationsList, observer) => {
					            let targetElement = document.querySelector('.' + targetClass);
					            if (targetElement) {
					                if (document.querySelector(`${$titleInit} .lpc-elements-dynamic-headline__title`)) {
					                    setTimeout(function () {
					                        dynamicTextWidth($titleInit, $title);
					                    }, 500);
		
					                    let currentWidth = window.innerWidth;
		
					                    window.addEventListener('resize', function () {
					                        if (window.innerWidth !== currentWidth) {
					                            currentWidth = window.innerWidth;
		
					                            setTimeout(function () {
					                                dynamicTextWidth($titleInit, $title);
					                            }, 500);
					                        }
					                    }, true);
					                }
		
					                observer.disconnect();
					            }
					        });
		
					        widthTitleObserver.observe(document.body, { childList: true, subtree: true });
					    }
		
					    observeElementWithClass('decor-wrap');
		
					    document.addEventListener("lp_init_after", function () {
					        let dynamic = setInterval(function () {
					            dynamicTextWidth($titleInit, $title);
					            clearInterval(dynamic);
					        }, 1000);
		
					        if (document.querySelector($title) && document.querySelector($title).classList.contains('bg_clip')) {
					            dynamicTextBg($titleInit, $title, $bgItem, $overlayItem);
					        }
					    });
		
					}
		
		
					
				});
			}
		}	
	};*/
	
	
	
	lp_template.queue.steps11 = function($self) {
		var $block = $self.hasClass('js-step-11') ? $self : $self.find('.js-step-11');
		if ($block.length) {
			try {
				let linePos = function(){
					let firstItemPos = $('.lp-steps-11-item__number').first().position().top,
						firstItemHeight = $('.lp-steps-11-item__number').first().outerHeight(),
						lastItemPos = $('.lp-steps-11-item__number').last().position().top;
	
					$('.lp-steps-11-items .line span').css('height', lastItemPos-firstItemPos-firstItemHeight);
					$('.lp-steps-11-items .line').css('top', firstItemPos+firstItemHeight);
				}
	
				linePos();
				$(window).resize(function(){
					var numbElemWidth = $block.find('.lp-steps-11-item__number').outerWidth() / 2;
					linePos();
					if (window.matchMedia('(max-width : 959px)').matches) {
				    	$block.find('.line').css('left', numbElemWidth);
				    }
				    else {
				    	$block.find('.line').css('left', '50%');
				    }
				});
	
			} catch(e) {
				console.log(e);
			}
		}
	}
	
	
	
	lp_template.queue.initVideoBlocks = function () {
	    let blocks = document.querySelectorAll(".lp-wrapp");
	    
	    blocks.forEach((block) => {
	        let videoPosters = block.querySelectorAll(".lp-video-poster");
	
	        videoPosters.forEach((videoPoster) => {
	            
	            videoPoster.addEventListener("click", function () {
	                let _this = this;
	
	                let parent = _this.closest('.lp-video-block-wrappper');
	
	                let container = parent.querySelector(".lp-video-container");
	
	                let iframe = container.querySelector("iframe");
	
	                let src = iframe.getAttribute("data-src").replace('autoplay=0','autoplay=1');
	
	                
	                iframe.setAttribute("src", src);
	
	                videoPoster.style.display = "none";
	
	                container.style.display = "block";
	            });
	        });
	    });
		/*
		const blocks = document.querySelectorAll(".lp-wrapp");
	
		blocks.forEach((block) => {
			const videoPosters = block.querySelectorAll(".lp-video-poster");
			const videoContainers = block.querySelectorAll(".lp-video-container");
	
			videoPosters.forEach((videoPoster, index) => {
				const iframe = videoContainers[index].querySelector("iframe");
	
				videoPoster.addEventListener("click", function () {
					const dataSrc = videoPoster.getAttribute("data-youtube-id");
	
					if (dataSrc) {
						iframe.setAttribute("src", "https://www.youtube.com/embed/" + dataSrc + "?autoplay=1&mute=1");
						videoPoster.removeAttribute("data-youtube-id");
						videoPoster.style.display = "none";
						videoContainers[index].style.display = "block";
					}
				});
			});
		});*/
	};
	
	document.addEventListener("DOMContentLoaded", function () {
		lp_template.queue.initVideoBlocks();
	});
	
	document.addEventListener("DOMContentLoaded", function () {
		var queryString = window.location.search;
		/*if (queryString.includes('lpc_test')) {*/
			$('body').prepend("<div class='lp-blocks-fon lp-blocks-fon-default'></div>");
		/*}*/
		
	});
	
	$('body').prepend("<div class='lp-blocks-fon lp-blocks-fon-default'></div>");
	
	lp_template.queue.bgVariable = function($self) {
		setTimeout(function() {
			let sourceElementBg = document.querySelector('.lp-blocks-fon');
		    if (sourceElementBg) {
		      // Получаем значение цвета фона
		      let backgroundColor = window.getComputedStyle(sourceElementBg).backgroundColor;
		      // Присваиваем это значение переменной CSS
		      document.documentElement.style.setProperty('--content-background-lp', backgroundColor);
		    }
		}, 50);
		
	}

	lp_template.queue.popupStepForm = function($self) {
		var $block = $self.find('.js-step-form-popup');
		
		if ($block.length) {
			$block.formsteps({
				mode: 'popup'
			});
		}
	};
	
	lp_template.queue.sliderBlockThumbGallery = function ($self) {
	    var $block = $self.attr('data-slider-gallary-thumb-init') ? $self : $self.find('[data-slider-gallary-thumb-init]');
	    
	    if ($block.length) {
	        $block.each(function(){
	            let $this = $(this);
				let $alignItem = $this.find($this.data('align-item'));
				let mediaGap = $this.data('margin');
				let mediaPerPage = $this.data('count');
				let mediaThumbGap = $this.data('thumb-margin');
				let mediaThumbFixedWidth = $this.data('thumb-width');
				let mediaThumbFixedHeight = $this.data('thumb-height');
				let mediaThumbDirectionItems = $this.data('thumb-direction');
				let mediaThumbDirection = [];

				if ($(this).data('move')) {
					var $mediaMove = $(this).data('move');
				} else {
					var $mediaMove = 1;
				}

				mediaThumbDirectionItems.forEach(function (item){
					if(item == 1) {
						item = 'ttb'
					}
					if(item == 0) {
						item = 'ltr'
					}
					mediaThumbDirection.push(item)
				});
	                
	            if($this.find('#main-slider').not('.is-active').length != 0 ) {
	                let splideThumbGallary = new Splide( $this.find('.splide').not('.is-active')[0], {
						autoplay: $this.data('autoplay'),
						speed: $this.data('speed'),
						interval: $this.data('pause'),
	                    /*rewind: $this.data('infinite'),*/
	                    //lazyLoad: $this.data('lazy-load'),
	                    rewind: true,
	                    perMove: $mediaMove,
	                    perPage: mediaPerPage[0],
	                    gap: mediaGap[0],
						dragMinThreshold: {
						    mouse: 5,
						    touch: 10,
						},	
						breakpoints: {
							1379: {
								perPage: 3,
								arrows: true,
								pagination: true,
								rewindByDrag: true,
	                            gap: mediaGap[1],
	                            perPage: mediaPerPage[1],
							},
							1199: {
								arrows: false,
								pagination: true,
								rewindByDrag: true,
	                            gap: mediaGap[2],
	                            perPage: mediaPerPage[2],
							},
							959: {
								arrows: false,
								pagination: true,
								rewindByDrag: true,
	                            gap: mediaGap[3],
	                            perPage: mediaPerPage[3],
							},
							599: {
								arrows: false,
								pagination: true,
								rewindByDrag: true,
	                            gap: mediaGap[4],
	                            perPage: mediaPerPage[4],
							}
						}
	                });
	                
	                let thumbnailsGallary = new Splide($this.find('.thumbnail-slider').not('.is-active')[0], {
	                  direction       : mediaThumbDirection[0],
					  rewind          : true,
					  count			  : 6,
					  fixedWidth      : mediaThumbFixedWidth[0],
					  fixedHeight     : mediaThumbFixedHeight[0],
					  isNavigation    : true,
					  pagination      : false,
					  perPage		  : 6,
					  cover           : false,
					  arrows     	  : $this.data('thumb-arrow'),
                	  drag            : true,
                	  padding         : 4,
					  gap             : mediaThumbGap[0],
					  clones          : 5,
					  heightRatio     : $this.data('height'),
					  dragMinThreshold: {
					    mouse: 5,
					    touch: 10,
					  }	,
					  classes 		  : {
					  	arrows: "splide__arrows splide__custom__arrows"
					  },
					  breakpoints: {
							1379: {
								gap: mediaThumbGap[1],
							    fixedWidth: mediaThumbFixedWidth[1],
							    fixedHeight: mediaThumbFixedHeight[1],
							    direction: mediaThumbDirection[1],
								heightRatio     : 3.2,
							},
							1199: {
								gap: mediaThumbGap[2],
							    fixedWidth: mediaThumbFixedWidth[2],
							    fixedHeight: mediaThumbFixedHeight[2],
							    direction: mediaThumbDirection[2],
							    heightRatio     : 3.2,
							},
							959: {
								gap: mediaThumbGap[3],
							    fixedWidth: mediaThumbFixedWidth[3],
							    fixedHeight: mediaThumbFixedHeight[3],
							    direction: mediaThumbDirection[3],
							    heightRatio     : 3.2,
							},
							599: {
								gap: mediaThumbGap[4],
							    fixedWidth: mediaThumbFixedWidth[4],
							    fixedHeight: mediaThumbFixedHeight[4],
							    direction: mediaThumbDirection[4],
							    heightRatio     : 3.2,
							}
					  }
					});

	                splideThumbGallary.sync( thumbnailsGallary );
	                
	                splideThumbGallary.mount();
	                
            		thumbnailsGallary.mount();
                	
					sliderBreakPoints();
					
					//sliderPaginationChecking();
					
					//document.addEventListener('dataMediaSourceChange', sliderBreakPoints);
					
					function sliderBreakPoints() {
						setTimeout(function(){
							if ($alignItem.length) {
								let itemHeight = $alignItem.outerHeight() / 2;
								let arrowsPosition = itemHeight + $alignItem.position().top;
								$this.find('.splide__arrow').css('top', arrowsPosition);
							}
						}, 100);
					};			
	            }
	        });
	    }	
	};
	
	lp_template.queue.sliderBlock = function ($self) {
		
	    let $block = $self.attr('data-slider-init') ? $self : $self.find('[data-slider-init]');
	    
	    if ($block.length) {
			if ($block.data('slider-thumb-init') != true) {
		        $block.each(function(){
		            let $this = $(this);
					let $alignItem = $this.find($this.data('align-item'));
					let mediaGap = $this.data('margin');
					let mediaPerPage = $this.data('count');
					
					if ($(this).data('move')) {
						var $mediaMove = $(this).data('move');
					} else {
						var $mediaMove = 1;
					}
	
		            if($this.find('.splide').not('.is-active').length != 0) {
		                let splide = new Splide( $this.find('.splide').not('.is-active')[0], {
							autoplay: $this.data('autoplay'),
							speed: $this.data('speed'),
							interval: $this.data('pause'),
		                    rewind: $this.data('infinite'),
		                    //lazyLoad: $this.data('lazy-load'),
		                    rewindByDrag: true,
		                    perMove: $mediaMove,
		                    perPage: mediaPerPage[0],
		                    gap: mediaGap[0],
							breakpoints: {
								/*1380: {
									perPage: 3,
									arrows: false,
									pagination: true,
									rewindByDrag: true,
		                            gap: mediaGap[0],
		                            perPage: mediaPerPage[0],
								},*/
								1379: {
									arrows: true,
									pagination: true,
									rewindByDrag: true,
		                            gap: mediaGap[1],
		                            perPage: mediaPerPage[1],
								},
								1199: {
									arrows: true,
									pagination: true,
									rewindByDrag: true,
		                            gap: mediaGap[2],
		                            perPage: mediaPerPage[2],
								},
								959: {
									arrows: false,
									pagination: true,
									rewindByDrag: true,
		                            gap: mediaGap[3],
		                            perPage: mediaPerPage[3],
								},
								599: {
									arrows: false,
									pagination: true,
									rewindByDrag: true,
		                            gap: mediaGap[4],
		                            perPage: mediaPerPage[4],
								}
							}
		                });
		                
		                /*splide.on('mounted', function() {
					        // Добавление классов к каждому слайду
					        splide.Components.Slides.forEach(function(slide, index) {
					            // Добавляем кастомный класс к каждому слайду
					            slide.slide.classList.add('custom-slide-class');
					            // Например, добавляем класс с порядковым номером
					            slide.slide.classList.add('slide-' + index);
					        });
					
					        // Добавляем кастомный класс к стрелкам
					        var prevArrow = splide.root.querySelector('.splide__arrow--prev .splide__arrow__bg');
					        var nextArrow = splide.root.querySelector('.splide__arrow--next .splide__arrow__bg');
					        
					        if (prevArrow) prevArrow.classList.add('lp-button', 'lp-button--type-1', '_primary-fill', '_v2-icon');
					        if (nextArrow) nextArrow.classList.add('lp-button', 'lp-button--type-1', '_primary-fill', '_v2-icon');
					    });*/
		                splide.mount();
		                
						sliderBreakPoints();
						
						function sliderBreakPoints() {
							setTimeout(function(){
								if ($alignItem.length) {
									let itemHeight = $alignItem.outerHeight() / 2;
									let arrowsPosition = itemHeight + $alignItem.position().top;
									$this.find('.splide__arrow').css('top', arrowsPosition);
								}
							}, 100);
						};
		            }
		        });
		    }
	    }
	};
	
	
	lp_template.queue.multipleSliders = function ($self) {
	    let $blocks = $self.attr('data-initializing-multiple-sliders') ? $self : $self.find('[data-initializing-multiple-sliders]');
	    
	    if ($blocks.length) {
	        $blocks.each(function () {
	            let $block = $(this);
	            
	            if ($block.data('slider-thumb-init') === true) return;
	            $block.data('slider-thumb-init', true);
	
	            let $alignItem = $block.find($block.data('align-item'));
	            let mediaGap = $block.data('margin');
	            let mediaPerPage = $block.data('count');
	
	            let mediaMove = $block.data('move') ? $block.data('move') : 1;
	            
	            let $splide = $block.find('.splide').not('.is-active');
	            if ($splide.length) {
	                $splide.each(function () {
	                    let splide = new Splide(this, {
	                        autoplay: $block.data('autoplay'),
	                        speed: $block.data('speed'),
	                        interval: $block.data('pause'),
	                        rewind:$block.data('infinite'),
	                        rewindByDrag: true,
	                        perMove: mediaMove,
	                        perPage: mediaPerPage[0],
	                        gap: mediaGap[0],
	                        breakpoints: {
	                            1379: {
	                                arrows: true,
	                                pagination: true,
	                                rewindByDrag: true,
	                                gap: mediaGap[1],
	                                perPage: mediaPerPage[1],
	                            },
	                            1199: {
	                                arrows: true,
	                                pagination: true,
	                                rewindByDrag: true,
	                                gap: mediaGap[2],
	                                perPage: mediaPerPage[2],
	                            },
	                            959: {
	                                arrows: false,
	                                pagination: true,
	                                rewindByDrag: true,
	                                gap: mediaGap[3],
	                                perPage: mediaPerPage[3],
	                            },
	                            599: {
	                                arrows: false,
	                                pagination: true,
	                                rewindByDrag: true,
	                                gap: mediaGap[4],
	                                perPage: mediaPerPage[4],
	                            }
	                        }
	                    });
	
	                    splide.mount();
	                    
	                    setTimeout(function () {
	                        if ($alignItem.length) {
	                            let itemHeight = $alignItem.outerHeight() / 2;
	                            let arrowsPosition = itemHeight + $alignItem.position().top;
	                            $block.find('.splide__arrow').css('top', arrowsPosition);
	                        }
	                    }, 100);
	                });
	            }
	        });
	    }
	};
	
	
	lp_template.queue.sliderReviews = function ($self) {
		let $block = $self.attr('data-slider-reviews-init') ? $self : $self.find('[data-slider-reviews-init]');
	
		if ($block.length) {
			$block.each(function () {
				let $this = $(this);
				let $alignItem = $this.find($this.data('align-item'));
	
				if ($this.find('.splide').not('.is-active').length != 0) {
					$this.find('.splide').not('.is-active').each(function () {
						
						let splide = new Splide($(this)[0], {
							autoplay: $this.data('autoplay'),
							speed: $this.data('speed'),
							interval: $this.data('pause'),
							lazyLoad: $this.data('lazy-load'),
							rewind: true,
							arrows: true,
							pagination: true,
							gap: 0,
							perPage: 1
						});
						
						splide.mount();
						
						if ($(this).find('.lp-reviews-gallery__item').length <= 1) {
							$(this).addClass('splide--pointer-events');
						}
					});
				}
			});
		}
	};
	
	
	
	
	/*
	lp_template.queue.promoSlider = function($self) {
		var $block = $self.find('.js-promo2-slider');
		
		$block.each(function (index, slider) {
		    var $slider = $(slider);
		    var autoplay = $slider.data('autoplay') || false;
		    $slider.slick({
		      dots: true,
		      autoplay: !!autoplay,
		      autoplaySpeed: autoplay
		    });
		    $slider.on('beforeChange', function (event, slick) {
		      var $this = $(this);
		      var $cloned = $this.find('.slick-cloned');
		      $cloned.each(function (index, slide) {
		        styleSlide(slide);
		      });
		      slick.$slides.each(function (index, slide) {
		        styleSlide(slide);
		      });
		    });
		  });
		  
		function styleSlide(slide) {
		  var $slide = $(slide).find('.lp-promo2__slider-item');
		  var $img = $slide.find('img');
		
		  if ($img.height() < $slide.height()) {
		    $slide.css({
		      'display': 'flex',
		      'align-items': 'center'
		    });
		  }
		}
	};*/
	
	lp_template.queue.spoilerBlock = function ($self) {
	    let $block = $self.hasClass('spoiler-init') ? $self : $self.find('.spoiler-init');

		$block.each(function(){
			
			let $this = $(this);
			
			function initSpoiler() {
				let $hidden = $this.find('.spoiler-item:hidden');
				let $firstNotHidden = $this.find('.spoiler-item').first();
				let $btn = $this.find('.spoiler-btn');
				let $btnWrap = $this.find('.spoiler-btn-wrap');
				
				

				if ($hidden.length) {
					$btnWrap.addClass('show_spoiler');
					
					$btn.on('click', function(){
						$hidden.slideDown('150', function(){
							if ($firstNotHidden.css('display') == 'flex') {
								$hidden.css('display', 'flex');
							}
						});
						$(this).hide();
						$(this).parent('.spoiler-btn-wrap').removeClass('show_spoiler');
					});
				} else  {
					$btnWrap.removeClass('show_spoiler');
				}
			}
			
			initSpoiler();
		});
	};
	
	lp_template.queue.headerInPopup = function($self) {
	
		/* Old Version */
		if (s3LP.is_cms) return;
		
		var $block = $self.find('._js-in-promo');
		
		if ($block.length) {
			$block.each(function(){
				var $this = $(this),
					$thisParent = $this.next('._insert-header');
					
				if ($thisParent.length) {
					$this.insertBefore($thisParent.find('.js-promo-before'));
					$thisParent.addClass('_header_inserted');
				}
			});
		}
	};
	
	lp_template.queue.headerCommunity = function($self) {
		var $header = $self.find('.js-community');
		
		if (s3LP.is_cms) return;
		
		if ($header.length) {
			$header.each(function() {
				var $this = $(this),
					$thisNewParent = findPromoBlock($this);
					
				if ($thisNewParent) {
					$this.insertBefore($thisNewParent.find('.js-before-community'));
					$thisNewParent.addClass('_unified');
				}
			});
		}
		
		function findPromoBlock ($block) {
			if (!$block.length) return null;
			
			var $next = $block.next('.js-make-community');
			
			if ($next.length) return $next;
			
			if (!$next.length) {
				return findPromoBlock($block.next());
			}
		}
	};
	
	lp_template.queue.partnersSlider1 = function($self) {
		var $block = $self.find('.js-partners-1');

		if ($block.length) {

			$block.each(function() {
				var $slider = $(this),
					count = $slider.data('count'),
					autoplay = !!$slider.data('autoplay'),
					pause = $slider.data('pause'),
					speed = $slider.data('speed'),
					arrows = !!$slider.data('arrows'),
					rewind = false,
					infinite = !!$slider.data('infinite');
					
					
					if(s3LP.is_cms){
	                	var infinite = false,
	                	$rewind = true,
	              		autoplay = false;
	                }
	              	else if(typeof ReactLPConstructor == 'object') {
	              		var infinite = false,
	              		$rewind = true,
	              		autoplay = false;
	              		
	              	}
					
				$slider.owlCarousel({
					autoplay: autoplay,
					autoplayTimeout: pause,
					smartSpeed: speed,
					rewind: $rewind,
					loop: infinite,
					dots: false,
					responsive: {
						0: {
							items: 1,
							margin: 0
						},
						600: {
							items: 3,
							margin: 24
						},
						960: {
							items: 3,
							margin: 48
						},
						1200: {
							items: count,
							margin: 24
						},
						1380: {
							items: count,
							margin: 36
						}
					}
				});
			});
		}		
	};

	lp_template.queue.elementsTable = function($self) {
		var $table = $self.find('.lp-elements-table table');
		if ($table.length) {
			$table.wrap('<div class="table-wrapper"></div>');
		};
	}

	lp_template.queue.contactsTab = function($self) {
		var $block = $self.find('.js-contacts-tab-1');
		var $allTabs = $self.find('.tab-item');
		var activeClass = 'active';
		
		$block.on('click', function(){
			
			var $thisParent = $(this).closest('.tab-item');
			
			if ($thisParent.hasClass(activeClass)) {
				$thisParent.removeClass(activeClass).find('.tab-item__text-part').slideUp();
			} else {
			
				$allTabs.removeClass(activeClass).find('.tab-item__text-part').slideUp();
				
				$thisParent.addClass(activeClass).find('.tab-item__text-part').slideDown();
			}
		});
		
		$($block[0]).trigger('click');
	}

	lp_template.queue.formInputs = function($self) {		
		
		$doc.on('click', '.js-select, .js-multi_select', function() {
			var $this = $(this),
				openedClass = '_opened',
				$thisParent = $this.closest('.lp-form-tpl__field-select, .lp-form-tpl__field-multi_select'),
				$thisList = $thisParent.find('.lp-form-tpl__field-select__list, .lp-form-tpl__field-multi_select__list');
				
			if ($thisParent.hasClass(openedClass)) {
				$thisParent.removeClass(openedClass);
				$thisList.slideUp();
			} else {
				$thisParent.addClass(openedClass);
				$thisList.slideDown();
			}
		});
		
		$(document).ready(function () {
	      $(".js-choose-select._checked").each(function () {
	        var $this = $(this),
	          thisText = $this.text(),
	          $thisParent = $this.closest(".lp-form-tpl__field-select"),
	          checkedClass = "_checked";
	
	        $thisParent.find(".js-choose-select").removeClass(checkedClass);
	        $thisParent.find(".lp-form-tpl__field-select__input").text(thisText);
	        $thisParent.parent().find("input").val(thisText);
	      });
	    });
		
		$doc.on('click', '.js-choose-select', function() {
			var $this = $(this),
				thisText = $this.text(),
				$thisParent = $this.closest('.lp-form-tpl__field-select'),
				checkedClass = '_checked';
				
			if (!$this.hasClass(checkedClass)) {
				$thisParent.find('.js-choose-select').removeClass(checkedClass);
				$this.addClass(checkedClass);
				$thisParent.find('.lp-form-tpl__field-select__input').text(thisText);
				$thisParent.parent().find('input').val(thisText);
			}
			
			$thisParent.find('.lp-form-tpl__field-select__list').slideUp();
			$thisParent.removeClass('_opened');
				
		});
		
		$doc.on('click', '.js-choose-milti_select', function() {
			var $this = $(this),
				$thisParent = $this.closest('.lp-form-tpl__field-multi_select'),
				checkedClass = '_checked';
				
			if (!$this.hasClass(checkedClass)) {
				$this.addClass(checkedClass);
			} else {
				$this.removeClass(checkedClass);
			}
			
			var choosenElements = $thisParent.find('.' + checkedClass),
				choosenElementsText = [];
				
			choosenElements.each(function() {
				choosenElementsText.push($(this).text());
			});
				
			$thisParent.find('.lp-form-tpl__field-multi_select__input--count').text(choosenElements.length);
			$thisParent.parent().find('input').val(choosenElementsText.join(', '));
		});
		
		
		
		$doc.on('click', function(e) {
			if ($(e.target).closest('.lp-form-tpl__field-select, .lp-form-tpl__field-multi_select').length) return;
			
			$doc.find('.lp-form-tpl__field-select, .lp-form-tpl__field-multi_select').removeClass('_opened');
			
			$doc.find('.lp-form-tpl__field-select__list, .lp-form-tpl__field-multi_select__list').slideUp();
		});
	}
	
	lp_template.queue.fpInit = function($self) {
		var $block = $self.find('.js-lp-fastpay');
		if ($block.length) {
			$block.on('click', '.js-fp-show-form', function(e) {
				e.preventDefault();
	
				var $this = $(this),
					$parent = $this.closest('.js-lp-fastpay'),
					//$currentParent = $this.parents('.lp-payment-service-item'),
					//currentPrice = $currentParent.find('.lp-payment-service-item_price').html(),
					needHref = $parent.data('page-path'),
					serviceID = $this.data('service-id'),
					fastPayID = $this.closest('.lp-payment-service-item').attr('data-fastpay-id');
					
					$this.addClass('_opened');
					
				$.ajax({
					url: '/-/x-api/v1/public/?method=fastpay/getService&param[service_id]='+serviceID+'&param[fast_pay_id]='+ fastPayID +'&param[tpl]=global:lp.fast_payment.tpl',
					success: function(data) {
						var htmlForm = data.result.html;
						var $newBlock = $this.closest('.lp-payment-service-item').append(htmlForm);
						//let $btn = $currentParent.find('.lp-form-tpl__button-wrapper .lp-button');
						
						//$btn.text($btn.text() + ' ' + currentPrice);
						
						
						s3LP.initForms($newBlock);
						$this.closest('.lp-payment-service-item').find('.lp-payment-service-item_button').hide();
						var needAttr = $self.find('.lp-payment__form').attr('data-api-url') + "&param[href]=" + needHref;
						$newBlock.find('.lp-payment__form').attr('data-api-url', needAttr);
						$newBlock.find('.lp-payment__form').data('api-url', needAttr);
						$this.closest('.lp-payment-service-item').find('.payment-selection:first').addClass('_active');
					}
				});
				
			});
	
			$block.find('.fp_free_wrap').each(function() {
				var $this = $(this).find('.js-lp-fp-form'),
					$parent = $this.closest('.js-lp-fastpay'),
					needHref = $parent.data('page-path'),
					needAttr = $this.attr('data-api-url') + "&param[href]=" + needHref;
		
				$this.attr('data-api-url', needAttr);
				$this.data('api-url', needAttr);
			});
			
			$block.on('click', '.payment-selection-in', function(e) {
				$(this).each(function () {
					e.preventDefault();
					$(this).parent('.payment-selection').siblings('.payment-selection').removeClass('_active');
					$(this).parent('.payment-selection').addClass('_active');
					$(this).siblings('.type-radio-payment').click();
				});
			});
			
			if($block.hasClass('lp-payment-ps_redirect')) {
				$block.closest('.lp-payment__wrap').addClass('status-fail')
			};
		}
	};
	
	
	lp_template.queue.popupFastPayData = function ($self) {
  		var searchLinkPopupText = "popup";
  		var searchLinkScrollText = "popup";
  		
  		if(s3LP.is_cms) {
  			$(document).ready(function () {
  				$(".lp-popup-fastpay .lp-popup-fastpay__form-price").text('0');
  			});
  		}

  		
  		$doc.on("click", function (e) {
  			if($(e.target).closest('.lp-tarifs-compare').length){
  				if($(e.target).closest('.lp-popup-hide-input-check').length) {
  					$(e.target).closest('.lp-popup-hide-input-check').each(function(){
  						var prodPrice = $(this).data('button-index');
  						var prodPriceCustom = prodPrice.replace(/\D/g, '');
  						
  						if (prodPrice.indexOf('/') !== -1) {
							var prodPrice = false;
						}
						
  						if(prodPrice) {
							$('.lp-popup-fastpay__form').show();
		  					$('.lp-popup-fastpay .lp-payment-inner form input[name="price"]').val(prodPriceCustom).hide();
		  					$('.lp-popup-fastpay .lp-payment-inner form input[name="price"]').closest('.lp-payment__form').removeClass('_input-active');
		  					
		  					if($('.lp-popup-fastpay .lp-payment-inner form input[name="price"]').closest('.lp-popup-fastpay__content').find('.lp-popup-fastpay__form-price').length == 0){
		  						$('.lp-popup-fastpay .lp-payment-inner form input[name="price"]').closest('.lp-popup-fastpay__content').find('.lp-popup-fastpay__form-price').text(prodPrice).show();
		  					}else {
		  						$('.lp-popup-fastpay .lp-payment-inner form input[name="price"]').closest('.lp-popup-fastpay__content').find('.lp-popup-fastpay__form-price').text(prodPrice);
		  					}
  						}
  						else {
							$('.lp-popup-fastpay .lp-payment-inner form input[name="price"]').closest('.lp-payment__form').addClass('_input-active');
			  				$('.lp-popup-fastpay__form').hide();
			  				$('.lp-popup-fastpay .lp-payment-inner form input[name="price"]').val("").show();
						}
  					});
  					
			  		var prodName = $(e.target).closest('.lp-popup-hide-input-check').data('button-name');
			  		
			  		if ($('.lp-popup-wrapper .lp-payment__form form').find('input[name=_order_details]').length) {
				  		$('.lp-popup-wrapper .lp-payment__form form').find('input[name=_order_details]').val(prodName);
			  		}
	  			}
  			} else {
	  			if($(e.target).closest('.lp-popup-hide-input-check').length) {
	  				if($doc.find("[name='price']") && $doc.find(".lp-payment__form") && $(e.target).attr('href').includes(searchLinkPopupText) && $(e.target).closest('.lp-product-name').find('[data-price-product]').length){
						var $this = $(this),
						prodPrice = $(e.target).closest('.lp-product-name').find('[data-price-product]').data('price-product');
						if (prodPrice.indexOf('/') !== -1) {
							var prodPrice = false;
						}else{
							var prodPriceCustom = $(e.target).closest('.lp-product-name').find('[data-price-product]').data('price-product').replace(/\D/g, '');
						}
						
						if(prodPrice) {
							$('.lp-popup-fastpay__form').show();
		  					$('.lp-popup-fastpay .lp-payment-inner form input[name="price"]').val(prodPriceCustom).hide();
		  					$('.lp-popup-fastpay .lp-payment-inner form input[name="price"]').closest('.lp-payment__form').removeClass('_input-active');
		  					
		  					if($('.lp-popup-fastpay .lp-payment-inner form input[name="price"]').closest('.lp-popup-fastpay__content').find('.lp-popup-fastpay__form-price').length == 0){
		  						$('.lp-popup-fastpay .lp-payment-inner form input[name="price"]').closest('.lp-popup-fastpay__content').find('.lp-popup-fastpay__form-price').text(prodPrice).show();
		  					}else {
		  						$('.lp-popup-fastpay .lp-payment-inner form input[name="price"]').closest('.lp-popup-fastpay__content').find('.lp-popup-fastpay__form-price').text(prodPrice);
		  					}
						}else {
							$('.lp-popup-fastpay .lp-payment-inner form input[name="price"]').closest('.lp-payment__form').addClass('_input-active');
			  				$('.lp-popup-fastpay__form').hide();
			  				$('.lp-popup-fastpay .lp-payment-inner form input[name="price"]').val("").show();
						}
	  					
	  				} else if($doc.find("[name='price']") && $doc.find(".lp-payment__form") && $(e.target).attr('href').includes(searchLinkPopupText) && !$(e.target).closest('.lp-product-name').find('[data-price-product]').length) {
	  					$('.lp-popup-fastpay .lp-payment-inner form input[name="price"]').closest('.lp-payment__form').addClass('_input-active');
	  					$('.lp-popup-fastpay__form').hide();
	  					$('.lp-popup-fastpay .lp-payment-inner form input[name="price"]').val("").show();
	  					$('.lp-popup-fastpay .lp-payment-inner form input[name="price"]').siblings('.lp-form-tpl__field-text-elem').hide();
	  				}
	  				var prodName = $(e.target).closest('.lp-product-name').find('[data-name-product]').data('name-product');
			  		if ($('.lp-popup-wrapper .lp-payment__form form').find('input[name=_order_details]').length) {
				  		$('.lp-popup-wrapper .lp-payment__form form').find('input[name=_order_details]').val(prodName);
			  		}
	  			}
	  			
	  			/*if($(e.target).closest('.lp-popup-hide-input-check').length && (!$(e.target).attr('href').includes(searchLinkPopupText) && !$(e.target).attr('href').includes(searchLinkScrollText)) && $(e.target).closest('.lp-product-name').find('[data-price-product]').length){
	  				var buttonLink = $(e.target).attr('href');
	  				prodPrice = $(e.target).closest('.lp-product-name').find('[data-price-product]').data('price-product');
	  				var fastPayLink = buttonLink + '?price=' + prodPrice;
	  				e.preventDefault();
	  				window.location.href = fastPayLink;
	  			}*/
  			}
  			if ($(e.target).closest('a').length && $(e.target).closest('.lp-popup-hide-input-check').length == 0) {
  				$('.lp-popup-fastpay .lp-payment-inner form input[name="price"]').closest('.lp-payment__form').addClass('_input-active');
  				$('.lp-popup-fastpay__form').hide();
  				$('.lp-popup-fastpay .lp-payment-inner form input[name="price"]').val("").show();
  			}
  		});
  	};
	
	lp_template.queue.calendar = function($self) {
		$doc.on('click', '.js-form-calendar', function() {
			var $this = $(this),
				thisCalendarInited = $this.data('calendarInited');
				
			if (!thisCalendarInited) {
				var bb = $this.datepicker().data('datepicker');
				bb.show();
				thisCalendarInited = $this.data('calendarInited', true);
				
			}
		});
		
		$doc.on('click', '.js-form-calendar-interval', function() {
		    var $this = $(this),
		        thisCalendarInited = $this.data('calendarInited');
		
		    if (!thisCalendarInited) {
		        var isMobile = window.matchMedia("(max-width: 768px)").matches; // мобильная версия
		
		        var position;
		        if (isMobile) {
					// для десктопа — проверяем положение
		            var elementOffset = $this.offset().top - $(window).scrollTop(); 
		            var windowHeight = $(window).height();
		            position = (elementOffset < windowHeight / 2) ? 'bottom center' : 'top center';
		            // для мобильной — всегда снизу
		           
		        } else {
		             position = 'bottom center';
		        }
		
		        var bb = $this.datepicker({
		            range: true,
		            multipleDatesSeparator: " - ",
		            position: position,
		        }).data('datepicker');
		
		        bb.show();
		        thisCalendarInited = $this.data('calendarInited', true);
		    }
		});
	}
	
	lp_template.queue.lgNew = function($self) {
	    let $block = $self.find('.js-new-lg-init');
	
	    if ($block.length) {
	        $block.each(function() {
	            let $block = $(this);
	            let lgCounter = $block.data('lg-counter');
	            let lgThumbnail = $block.data('lg-thumbnail');
	           
				setTimeout(function () {
					$block.find('.lp-lg-item').each(function () {
						let $a = $(this);
		               
		                if ($a.is('[data-lp-vk]')) {
		                    let iframe = $a.find('iframe');
		                    if (iframe.length) {
		                        let src = iframe.attr('src');
		                        if (src) {
		                            $a.attr('href', src).attr('data-iframe', 'true');
		                        }
		                    }
		                }
					});
				}, 200);
	            
		        setTimeout(function () {
					lightGallery($block[0], {
						plugins: [Zoom, Thumbnail, Video],
						counter: lgCounter,
						thumbnail: lgThumbnail,
						selector: '.lp-lg-item',
						download: false,
						mobileSettings: {
							preload: 2,
							controls: false,
							showCloseIcon: true
						}
					});
				}, 300);
	
	            $block.find('.lp-lg-item').removeClass('lp_lg_pointer_events');
	        });
	    }
	}
	
	lp_template.queue.lg = function($self) {
		var $block = $self.find('.js-lg-init');
		
		if ($block.length) {
			$block.lightGallery({
				selector: '.lg-item',
				share: false,
				hash: false,
				autoplayControls: false,
				actualSize: false,
				toogleThumb: false,
				getCaptionFromTitleOrAlt: false,
				download: false,
				thumbWidth: 64,
				thumbHeight: '64px',
				nextHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.98528 4.32805C9.3758 3.93753 10.009 3.93753 10.3995 4.32805L17.0563 10.9849C17.4469 11.3754 17.4469 12.0086 17.0563 12.3991L10.3995 19.056C10.009 19.4465 9.3758 19.4465 8.98528 19.056C8.59475 18.6654 8.59475 18.0323 8.98528 17.6418L14.935 11.692L8.98528 5.74226C8.59475 5.35174 8.59475 4.71857 8.98528 4.32805Z" fill="white"/></svg>',
				prevHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.8492 5.03516L8.19239 11.692L14.8492 18.3489" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
			});
			
			$block.find('.lg-item').removeClass('lg-pointer-events');
		}
	}
	
	lp_template.queue.qaToggle = function($self) {
		var $block = $self.hasClass('js-qa-toggle') ? $self : $self.find('.js-qa-toggle');
		
		if($block.length) {
			$block.each(function(){
				var $this = $(this);
				
				if($('.lp-qa-3-questions-col').length) {
					var elemLength = $('.lp-qa-3-questions-col:first-child').find('.lp-qa-3-questions__item');
					function getMaxOfArray(nums) {
					  return Math.max.apply(null, nums);
					}
					for (i = 0; i < elemLength.length; i++) {
						var i = i,
							numArr = [],
							$thisElem = $this.find('.lp-qa-3-questions__item:nth-child(' + (i + 1) + ') .lp-qa-3-questions__item-title');
							$($thisElem).each(function(){
								var height = $(this).outerHeight();
									numArr.push(height);
							});
						$thisElem.css('height', getMaxOfArray(numArr));
					}
				}
			
				if (s3LP.is_cms && !$('body').hasClass('preview_mode')) {
					setTimeout(function(){
						$this.find('._col:first-child ._item:first-child').addClass('isCMS').addClass('active');
					},500);
				}
		
				var $button = $this.find('.js-qa-show'),
					activeClass = 'active',
					$closeButton = $this.find('.js-qa-hide');
					
					
					
				
				$button.on('click', function(e) {
					e.preventDefault();
					var $parent = $(this).closest('._item'),
					$wrapScroll = $(window).scrollTop();
					
					$parent.addClass(activeClass);
					$parent.find('._text').slideDown();
					$(this).siblings('.js-qa-hide').attr('data-scroll-top', $wrapScroll);
				});
				
				$closeButton.on('click', function(e) {
					e.preventDefault();
					var $parent = $(this).closest('._item'),
					$scroolTop = $(this).attr('data-scroll-top');
					
					
					$parent.removeClass(activeClass);
					$parent.find('._text').slideUp();
					$(window).scrollTop($scroolTop);
				});
			});
			
		}
	}
	
	lp_template.queue.titleHeight = function($self) {
		var $block = $self.find('.js-title-height'),
			func = function() {
				$block.each(function(){
					var $this = $(this),
						$title = $this.find('._title'),
						minWidth = $this.data('min-width') || 960,
						minHeight = 0;
						
					$title.css({
						minHeight: 0
					});
					
					if ($(window).width() >= minWidth) {
						$title.each(function(){
							var thisHeight = $(this).height();
							
							if (minHeight < thisHeight) {
								minHeight = thisHeight;
							}
						});	
						
						$title.css({
							minHeight: minHeight
						});
					}
				});
			};
			
		$(window).on('resize', func);
		if (s3LP.is_cms && typeof LpController !== 'undefined') {
			setTimeout(function(){
				LpController.afterSave(function () {
				    func();
				});
			},1000);
		}
	}
	
	lp_template.queue.accordeonContact = function ($self) {
	    var $block = $self.find('.lp-contact-accordeon-wrap .js-accordeon');
	    
	    $block.each(function(){
	    	var $tabsRemember = $(this).closest('.lp-block').find('._item');
	    	
	        $(this).on('click', function (event) {
	            var $thisParent = $(this).closest('._item'),
	                $thisText = $thisParent.find('._text'),
	                $maps = $(this).parents('.lp-maps-parent').find('.js-lp-simple-map'),
	                $thisBlock = $(this).closest('.lp-block').data('block-layout');
	             
				if ($(event.target).hasClass('_text')) {
					event.stopPropagation();
					return;
				}
				
	            if (!$thisText.is(':animated')) {
	                $thisParent.toggleClass('active');
	                $thisText.slideToggle();
	    
	                if ($maps.length && !$maps.hasClass('initialized')) {
	                    $maps.each(function () {
	                        var $map = $(this);
	    
	                        setTimeout(function(){
	                            lp_template.checkMapInitialization($map);
	                            $map.addClass('initialized');
	                        }, 400)
	                    });
	                }
	            }
	            	
	        	var openTabsArray = []; 
				
				$tabsRemember.each(function(index) {
				    if ($(this).hasClass('active')) {
				    	openTabsArray.push(index);
				    }
				});
				
				var jsonStrOpenTabsArray = JSON.stringify(openTabsArray);
				
				createCookie($thisBlock, jsonStrOpenTabsArray, 1);
	        });
	
	        $tabsRemember.each(function(){
	        	if ($(this).hasClass('active')) {
			        $(this).find('._text').slideDown();
		        }
	        });
	        
	        if ($(this).data('accordeon-opened') == 1) {
		    	$(this).trigger('click', function(){});
		    	
		    	if (s3LP.is_cms) {
		    		$('.content_contructor').trigger('click', function(){});
		    	}
		    }
	    });
	
	};
	
	lp_template.queue.accordeon = function($self) {
		var $block = $self.find('.js-accordeon');
		
		$block.on('click', function() {
			var $thisParent = $(this).closest('._item'),
				$thisText = $thisParent.find('._text');
			
			if (!$thisText.is(':animated')) { 
				$thisParent.toggleClass('active');
				$thisText.slideToggle();
			}
		});
		
		if (s3LP.is_cms && !$('body').hasClass('preview_mode')) {
			$block.closest('[data-block-layout]').find('._item:first-child').addClass('isCMS').addClass('active');
		}
	}
	
	lp_template.queue.qa10Tabs = function($self) {
		var $block = $self.find('.js-10-qa');
		
		$win.on('resize', function(){
			
			$block.each(function(){
				var contentHeight = 0,
					$this = $(this);
				
				$this.find('.lp-qa-10-item__text').each(function(){
					if ($(this).height()>contentHeight){
						contentHeight = $(this).height()
					}
				});
				
				$this.find('.lp-qa-10-content').css('min-height', contentHeight);
			});
		});
		
		$block.on('click', '.lp-qa-10-item__title', function() {
			var $this = $(this),
				$parent = $this.closest('.js-10-qa'),
				$content = $this.parent().find('.lp-qa-10-item__text'),
				$allTitles = $parent.find('.lp-qa-10-item__title');
				
			if ($win.width() > 959) {
			
				var qaContent = $parent.find('.lp-qa-10-content');

				if ($this.hasClass('_active')) {
					qaContent.html('');				
					$this.removeClass('_active');
				} else {
					qaContent.html('');
					$allTitles.removeClass('_active');
					$this.addClass('_active');
					$content.clone(true).removeAttr('style').appendTo(qaContent);
				}
				
			
			} else {
				
				if ($this.hasClass('_active')) {
					$this.removeClass('_active');
					$content.slideUp();
				} else {
					$allTitles.removeClass('_active');
					$parent.find('.lp-qa-10-item__text').slideUp();

					$this.toggleClass('_active')
					$content.slideDown();
				}
			}
		});
		
		$block.each(function(){
			var $this = $(this);
			
			$this.append('<div class="lp-qa-10-content"></div>');
			
			$this.find('.lp-qa-10-item__title').eq(0).trigger('click');
		});
	}

	lp_template.queue.videoPlayButton = function($self) {
		//$self.find('.js-lp-play-video').remove();
		//$self.find('.lp-video-block-wrappper').find('video').attr('controls', 1);
		
		var $allVideoParets = $self.find('.js-lp-play-video').closest('.lp-video-block-wrappper');

		$self.on('click', '.js-lp-play-video', function(e) {
			e.preventDefault();

			var $this = $(this);
			var thisVideo = $this.parent('.lp-video-block-wrappper').find('video')[0];

			$this.addClass('hide');
			thisVideo.play();
			thisVideo.setAttribute('controls', 1);
		});

		$allVideoParets.find('video').each(function(){
	        var $video = $(this);
	        
	        this.addEventListener('play', function() {
	            $video.parent('.lp-video-block-wrappper').find('.js-lp-play-video').addClass('hide');
	        });
	
	        this.addEventListener('pause', function(){
	            $video.parent('.lp-video-block-wrappper').find('.js-lp-play-video').removeClass('hide');
	        });
	    });
	}
	
	lp_template.queue.QRcode = function ($self) {
		let $block = $self.find('.lp_qr_init');
	
		if ($block.length) {
			$block.each(function () {
				let item = $(this);
				let messengerWrap = item.find('.lp_qr_code_item');
	
				messengerWrap.each(function () {
					let item = $(this);
					let containerQr = item.find('.lp_qr_code_container');
					let containerQrPhone = item.find('.lp_qr_code_container_phone');
	
					let messengerLinks = item.find('.lp_qr_code_link');
					let messengerLinksPhone = item.find('.lp_qr_code_link_phone');
	
					let urls = messengerLinks.map(function () {
						return $(this).attr('href');
					}).get();
	
					let urlsPhone = messengerLinksPhone.map(function () {
						return $(this).attr('href').replace(/[^\d+]/g, '');
					}).get();
	
					let sizes = messengerLinks.map(function () {
						return $(this).attr('data-qr-code-size');
					}).get();
	
					let sizesPhone = messengerLinksPhone.map(function () {
						return $(this).attr('data-qr-code-size');
					}).get();
	
					urls.forEach(function (url, index) {
						if (containerQr.length) {
							createQR(containerQr.eq(index), sizes[index], url);
							$('body').append(containerQr.eq(index));
						}
					});
	
					urlsPhone.forEach(function (url, index) {
						if (containerQrPhone.length) {
							createQR(containerQrPhone.eq(index), sizesPhone[index], url);
							$('body').append(containerQrPhone.eq(index));
						}
					});
	
					messengerLinks.hover(function () {
						let index = messengerLinks.index(this);
						showQR(containerQr.eq(index), $(this));
					}, function () {
						let index = messengerLinks.index(this);
						hideQR(containerQr.eq(index));
					});
	
					messengerLinksPhone.hover(function () {
						let index = messengerLinksPhone.index(this);
						showQR(containerQrPhone.eq(index), $(this));
					}, function () {
						let index = messengerLinksPhone.index(this);
						hideQR(containerQrPhone.eq(index));
					});
				});
	
				function createQR(container, size, url) {
					container.qrcode({
						width: size,
						height: size,
						text: url
					}).css({
						position: 'absolute',
						display: 'none',
						zIndex: 1000
					});
				}
	
				 function showQR(container, link) {
	                let linkOffset = link.offset();
	                let containerWidth = container.outerWidth();
	                let containerHeight = container.outerHeight();
	
	                let left = linkOffset.left; // Относительно левого края наведенного элемента
	                let top = linkOffset.top - containerHeight - 10;

					// Проверяем, выходит ли контейнер за пределы экрана справа
				    if (left + containerWidth > $(window).width()) {
				        left = linkOffset.left - containerWidth + link.outerWidth();
				    }
	
	                container.css({
	                    top: top,
	                    left: left,
	                    display: 'block'
	                });
	            }
	
				function hideQR(container) {
					container.css({
						display: 'none'
					});
				}
			});
		}
	}
	
	lp_template.queue.lpFlexImageBlock = function ($self) {
		/*const paramsGet = new URLSearchParams(window.location.search);
		if(paramsGet.has('lpc_test')){*/	
			var $block = $self.hasClass('lp-flexible-image-js') ? $self : $self.find('.lp-flexible-image-js');
			// if(typeof ReactLPConstructor == 'object') {
			// 	var $block = $self.find('.lp-flexible-image-js') ? $self : $self.hasClass('.lp-flexible-image-js');
			// }else {
			// 	var $block = $self.hasClass('.lp-flexible-image-js') ? $self : $self.find('.lp-flexible-image-js');
			// }
	
			if($block.length) {
				
				$block.each(function () {
					let $item = $(this);
					let $itemId = $item.attr('id');			
					
					let $imgInit = `#${$itemId}.lp-flexible-image-js`;
					
					console.log($imgInit);
					
					function flexibleImage(parent){
						console.log("tes");
						
						let blockParent = document.querySelector(parent);
						let inner = blockParent.querySelector('.lp-flexible-image__inner-js');
						let list = blockParent.querySelector('.lp-flexible-image__list-js'); 
						
						let wrap = blockParent.querySelector('.lp-flexible-image__wrap-js');
						let wrapWidth = wrap.offsetWidth;
						
						let blockParentWidth = blockParent.offsetWidth;
						
						list.style.width = blockParentWidth + 'px';
						
						let inWrap = blockParent.querySelector('.lp-flexible-image__in-wrap-js');
						
						let docWidth = document.documentElement.clientWidth;
						
						let WrapPos = wrap.getBoundingClientRect();
						
						//console.log(WrapPos.left)
						
						//inWrap.style.marginLeft = -WrapPos.left + 'px';
						//inWrap.style.marginRight = -(WrapPos.right - wrapWidth) + 'px';
						
						let inWrapMarginLeft = WrapPos.left;
						let inWrapMarginRight = (docWidth - WrapPos.right);
						
						inWrap.style.marginLeft = -inWrapMarginLeft + 'px';
						inWrap.style.marginRight = -inWrapMarginRight + 'px';
						
						//console.log(inWrapMarginLeft)
						//console.log(inWrapMarginRight)
						
						//let itemMarginRight = docWidth - slideWrap.getBoundingClientRect().right;
							
						inner.classList.add('load');
						
						
						let listGapStr = getComputedStyle(list).gridGap
						
						if(listGapStr === 'normal'){
							listGapStr = '32px';
						}
						
						let listGap = parseInt(listGapStr);
						
						
						let blockOutDivision = 8;
						let innerMargin = (wrapWidth - (listGap * 3)) / blockOutDivision;
						
						//console.log(innerMargin)
						
						let innerMarginLeft = 0;
						let innerMarginRight = 0;
						
						if(inWrapMarginLeft !== inWrapMarginRight){
							innerMarginLeft = innerMargin - ((inWrapMarginLeft - inWrapMarginRight) / 2);
							innerMarginRight = innerMargin + ((inWrapMarginLeft - inWrapMarginRight) / 2);
						}  else {
							innerMarginLeft = innerMargin;
							innerMarginRight = innerMargin;
						}
						
						inner.style.marginLeft = -innerMarginLeft + 'px';
						inner.style.marginRight = -innerMarginRight + 'px';
						
						let innerWidth = inner.offsetWidth;
						let innerHeight = inner.offsetHeight;
						
						let listStageWidth = innerWidth - blockParentWidth;
						
						//console.log(innerWidth)
						
						let images = blockParent.querySelectorAll('.lp-flexible-image__image-js');
						
						let miniImageWidth = (blockParentWidth - listGap * 3) / 4;
						
						
						list.style.gridTemplateColumns = miniImageWidth + 'px ' + 'auto ' + 'auto ' + miniImageWidth + 'px';
						
						if(images[0]){
						
							let imageBig = images[0];
							
							if(imageBig.classList.contains('_1_1')) {
								
								imageBig.style.height = blockParentWidth / 2  + 'px';
								
							} else if (imageBig.classList.contains('_4_3h')) {
								
								
								imageBig.style.height = blockParentWidth * 3 / 8 + 'px';
								
							} else if (imageBig.classList.contains('_3_2h')) {
								
								imageBig.style.height = blockParentWidth / 3 + 'px';
								
							} else if (imageBig.classList.contains('_16_9h')) {
							
								
								imageBig.style.height = blockParentWidth * 9 / 30 + 'px';
								
							} else if (imageBig.classList.contains('_4_3v')) {
							
								
								imageBig.style.height = blockParentWidth * 2 / 3 + 'px';
								
							} else if (imageBig.classList.contains('_3_2v')) {
							
								
								imageBig.style.height = blockParentWidth * 3 / 4 + 'px';
								
							} else if (imageBig.classList.contains('_16_9v')) {
							
								
								imageBig.style.height = blockParentWidth * 8 / 9 + 'px';
								
							}
							
							
							
						}
						
						let heightStep = 0;
						
						heightStep = 40;
						
						
						function updateHeightStep() {
						    const decorWrap = document.querySelector('.decor-wrap');
						    if (decorWrap) {
						        const mediaSource = decorWrap.getAttribute('data-media-source');
						        if (mediaSource === 'media-xl' || mediaSource === 'media-lg' || mediaSource === 'media-md') {
						            heightStep = 40;
						        } else if (mediaSource === 'media-sm' || mediaSource === 'media-xs') {
						            heightStep = 60;
						        }
						    }
						}
						
						// Наблюдатель за изменениями атрибута data-media-source
						const observer = new MutationObserver(updateHeightStep);
						
						// Начало наблюдения за элементом
						const decorWrap = document.querySelector('.decor-wrap');
						if (decorWrap) {
						    observer.observe(decorWrap, {
						        attributes: true, // Наблюдаем за изменениями атрибутов
						        attributeFilter: ['data-media-source'] // Фильтруем только изменения атрибута data-media-source
						    });
						}
						
						// Вызов функции для первоначальной установки значения
						updateHeightStep();
						
						
						
						
						let heightStepArr = [heightStep, heightStep - 10, heightStep - 20, heightStep - 30]
						
						
						//console.log(heightStepArr)
						
						
						
						let listNewWidth = blockParentWidth;
						
						let windowHeight = document.documentElement.clientHeight;
						
						let topStagePercent = 0;
						
						let debounceTimer;
						
						window.addEventListener('scroll', function(event){
							clearTimeout(debounceTimer);
							
							debounceTimer = setTimeout(function () {
								updateListWidth()
							}, 5);
						})
						
						updateListWidth()
						
						function updateListWidth() {
							topStagePercent = Math.round(list.getBoundingClientRect().top / windowHeight * 100);
						
							//console.log(topStagePercent);
							
							if(inner.classList.contains('_rotate_left')){
								
								if(topStagePercent < heightStepArr[0] && topStagePercent >= heightStepArr[1]){
									list.style.width = listNewWidth + (listStageWidth / 4)  + 'px';
									inner.style.transform = 'rotate(-' + 1 + 'deg)';
									
								} else if (topStagePercent < heightStepArr[1] && topStagePercent >= heightStepArr[2])	{	
									list.style.width = listNewWidth + (listStageWidth / 2)  + 'px';
									inner.style.transform = 'rotate(-' + 2 + 'deg)';
									
								} else if (topStagePercent < heightStepArr[2] && topStagePercent >= heightStepArr[3])	{
									list.style.width = listNewWidth + (listStageWidth / 4 * 3)  + 'px';
									inner.style.transform = 'rotate(-' + 3 + 'deg)';
									
								} else if (topStagePercent < heightStepArr[3])	{
									list.style.width = listNewWidth + listStageWidth  + 'px';
									inner.style.transform = 'rotate(-' + 4 + 'deg)';
									
								} else {
									listNewWidth = blockParentWidth
									list.style.width = listNewWidth + 'px';
									inner.style.transform = 'rotate(' + 0 + 'deg)';
									
								}
								
							} else if(inner.classList.contains('_rotate_right')){
							
								if(topStagePercent < heightStepArr[0] && topStagePercent >= heightStepArr[1]){
									list.style.width = listNewWidth + (listStageWidth / 4)  + 'px';
									inner.style.transform = 'rotate(' + 1 + 'deg)';
									
								} else if (topStagePercent < heightStepArr[1] && topStagePercent >= heightStepArr[2])	{	
									list.style.width = listNewWidth + (listStageWidth / 2)  + 'px';
									inner.style.transform = 'rotate(' + 2 + 'deg)';
									
								} else if (topStagePercent < heightStepArr[2] && topStagePercent >= heightStepArr[3])	{
									list.style.width = listNewWidth + (listStageWidth / 4 * 3)  + 'px';
									inner.style.transform = 'rotate(' + 3 + 'deg)';
									
								} else if (topStagePercent < heightStepArr[3])	{
									list.style.width = listNewWidth + listStageWidth  + 'px';
									inner.style.transform = 'rotate(' + 4 + 'deg)';
									
								} else {
									listNewWidth = blockParentWidth
									list.style.width = listNewWidth + 'px';
									inner.style.transform = 'rotate(' + 0 + 'deg)';
									
								}
								
							} else {
							
							//console.log(listNewWidth)
								
								if(topStagePercent < heightStepArr[0] && topStagePercent >= heightStepArr[1]){
									list.style.width = listNewWidth + (listStageWidth / 4)  + 'px';
									
								} else if (topStagePercent < heightStepArr[1] && topStagePercent >= heightStepArr[2])	{	
									list.style.width = listNewWidth + (listStageWidth / 2)  + 'px';
									
								} else if (topStagePercent < heightStepArr[2] && topStagePercent >= heightStepArr[3])	{
									list.style.width = listNewWidth + (listStageWidth / 4 * 3)  + 'px';
									
								} else if (topStagePercent < heightStepArr[3])	{
									list.style.width = listNewWidth + listStageWidth  + 'px';
									
								} else {
									listNewWidth = blockParentWidth
									list.style.width = listNewWidth + 'px';
									
								}
								
							}
						}
							
					}
	
	
					if (s3LP.is_cms) {
						if(document.querySelector($imgInit)){	
						
							document.addEventListener('lpcLoadingDone', function(){
								flexibleImage($imgInit);
							});
							
							setTimeout(function(){
								flexibleImage($imgInit);
							}, 1000)
								
						}
						
					}else{
						document.addEventListener('lpc_init_after', function () {
							
							let lpc_block = document.querySelector($imgInit);
							
							if (lpc_block) {
						        let observer = new IntersectionObserver((entries, observer) => {
						            entries.forEach(entry => {
						                if (entry.isIntersecting) {
						                    flexibleImage($imgInit);
						                    observer.unobserve(entry.target); // Остановить наблюдение после первого появления
						                }
						            });
						        }, { threshold: 0.1 }); // Запускать, когда хотя бы 10% блока в зоне видимости
						
						        observer.observe(lpc_block);
						    }
						});
						
						// Отслеживание изменения размера окна
						let currentWidth = window.innerWidth;
						
						window.addEventListener('resize', function () {
							
							setTimeout(function(){
							    if (window.innerWidth !== currentWidth) {
							        currentWidth = window.innerWidth;
							        let lpc_block = document.querySelector($imgInit);
							
							        if (lpc_block) {
							            let observer = new IntersectionObserver((entries, observer) => {
							                entries.forEach(entry => {
							                    if (entry.isIntersecting) {
							                        flexibleImage($imgInit);
							                        observer.unobserve(entry.target); // Остановить наблюдение после первого появления
							                    }
							                });
							            }, { threshold: 0.1 });
							
							            observer.observe(lpc_block);
							        }
							    }
							}, 500)
						    
						}, true);
						
					}
				});
			}
		/*}*/
	}	
	
	lp_template.queue.lpStepForm = function($self) {
	  var $block = $self.find('.js-lp-steps-form');
	
	  if ($block.length) {
	    $block.formsteps();
	  }
	}
	
	lp_template.queue.qaSlider1 = function($self) {
		var $block = $self.find('.js-qa-slider-1');

		if ($block.length) {
			$block.each(function(){
				var $this = $(this),
					autoplay = !!$this.data('autoplay'),
					count = $this.data('count') || 2,
					loop = !!$this.data('infinite'),
					nav = !!$this.data('arrows'),
					dots = !!$this.data('dots'),
					pause = $this.data('pause') || 5000,
					speed = $this.data('speed') || 250,
					$parent = $this.closest('[data-block-layout]'),
					rewind = false,
					$dots = $parent.find('.js-dot-item');
					
					if(s3LP.is_cms){
	                	var loop = false,
	                	$rewind = true,
	              		autoplay = false;
	                }
	              	else if(typeof ReactLPConstructor == 'object') {
	              		var loop = false,
	              		$rewund = true,
	              		autoplay = false;
	              	}

				$this.owlCarousel({
					autoplay : autoplay,
					loop : loop,
					nav : nav,
					dots : true,
					rewind: $rewind,
					smartSpeed: speed,
					autoplayTimeout: pause,
					responsive:{
						0: {
							items : 1,
							margin : 0
						},
						960: {
							items: count,
							margin : count > 1 ? 48 : 0
						},
						1200: {
							items: count,
							margin : count > 1 ? 24 : 0
						},
						1380: {
							items: count,
							margin : count > 1 ? 32 : 0
						}
					},
					onInitialized: function() {
						$dots.eq(0).addClass('active')
					},
					onTranslated: function(e) {
						$dots.removeClass('active');
					}
				});

				$parent.on('click', '.js-next-slide', function(e) {
					e.preventDefault();
					$this.trigger('next.owl.carousel');
				});

				$parent.on('click', '.js-prev-slide', function(e) {
					e.preventDefault();
					$this.trigger('prev.owl.carousel');
				});

				$parent.on('click', '.js-dot-item', function(e) {
					e.preventDefault();
					$this.trigger('to.owl.carousel', [$(this).index()]);
				});

			});
		}
	}

	lp_template.queue.simpleSlider = function ($self) {
	    var $block = $self.find('.js-simple-slider');
	
	    if ($block.length) {
	        $block.each(function () {
	            var $this = $(this),
	                autoplay = !!$this.data('autoplay'),
	                loop = !!$this.data('infinite'),
	                autoWidth = !!$this.data('autowidth'),
	                center = !!$this.data('center'),
	                nav = !!$this.data('arrows'),
	                dotsEach = !!$this.data('dots-each'),
	                dots = 1,
	                $rewind = 0,
	                pause = $this.data('pause') || 5000,
	                speed = $this.data('speed') || 250,
	                fade = !!$this.data('fade'),
	                drag = $this.data('drag'),
	                parentSelector = $this.data('parent') ? $this.data('parent') : '[data-block-layout]',
	                $parent = $this.closest(parentSelector),
	                dataResponse = $this.data('response'),
	                response = {},
	                $dots = $parent.find('.lp-dots-wrapper');
	                
	                if (typeof drag === "undefined") {
					  drag = 1;
					}
	                
	                if(s3LP.is_cms){
	                	var loop = false,
	                	$rewind = true,
	              		autoplay = false;
	                }
	              	else if(typeof ReactLPConstructor == 'object') {
	              		var loop = false,
	              		$rewind = true,
	              		autoplay = false;
	              		
	              	}
	
	            response.responsive = dataResponse || {};
	            if ($this.parents('[data-elem-type="block"]').find('.js-lg-init').length) {
	                setTimeout(function () {
	                    initSlider()
	                }, 500);
	            } else {
	                initSlider()
	            };
	
	
	            function initSlider() {
	                $this.owlCarousel($.extend({
	                    items: 1,
	                    autoplay: autoplay,
	                    loop: loop,
	                    autoWidth: autoWidth,
	                    center: center,
	                    nav: nav,
	                    dots: true,
	                    rewind: $rewind,
	                    dotsEach: dotsEach,
	                    animateIn: fade ? 'fadeIn' : false,
	                    animateOut: fade ? 'fadeOut' : false,
	                    smartSpeed: speed,
	                    touchDrag: s3LP.is_cms ? false : true,
	                    mouseDrag: drag,
	                    autoplayTimeout: pause,
	                    onInitialized: function (e) {
	                        var $dotsCount = $parent.find('.owl-dot').length;
	
	                        if (!$dots.length || $dotsCount < 2) {
	                            $dots.html('');
	
								if (!$dots.length && $dotsCount < 2) {
	                            	$parent.find('.js-next-slide, .js-prev-slide').addClass('_hide');
								}
	                            return;
	                        };
	                        var $dotsHTML = '';
	
	                        for (var i = 0; i < $dotsCount; i++) {
	                            $dotsHTML += '<div class="lp-dots-item js-dot-item" data-elem-type="container" data-lp-selector=".lp-dots-item"></div>';
	                        }
	
	                        if (!$dots.hasClass('_unchanged')) {
	
	                            $dots.html($dotsHTML);
	
	                        }
	
	                        $dots.find('.lp-dots-item').eq(0).addClass('active');
	
	                    },
	
	                    onResized: function (e) {
	                        if (!$dots.length || e.page.count < 2) {
	                            $dots.html('');
	                            $parent.find('.js-next-slide, .js-prev-slide').addClass('_hide');
	                            $parent.find('.js-next-slide, .js-prev-slide').removeClass('_show');
	                            return;
	                        } else {
	                            $parent.find('.js-next-slide, .js-prev-slide').addClass('_show');
	                            $parent.find('.js-next-slide, .js-prev-slide').removeClass('_hide');
	                        }
	
	                        var $dotsHTML = '';
	                        for (var i = 0; i < e.page.count; i++) {
	                            $dotsHTML += '<div class="lp-dots-item js-dot-item" data-elem-type="container" data-lp-selector=".lp-dots-item"></div>';
	                        }
	
	                        if (!$dots.hasClass('_unchanged')) {
	                            $dots.html($dotsHTML);
	                        }
	                        $dots.find('.lp-dots-item').removeClass('active');
	                        $dots.find('.lp-dots-item').eq(e.page.index).addClass('active');
	                    },
	                    onTranslate: function (e) {
	                        $dots.find('.lp-dots-item').removeClass('active');
	                        $dots.find('.lp-dots-item').eq(e.page.index).addClass('active');
	                    }
	                }, response));
	                
	                if (autoplay) {
		                $this.on('mousedown', function(event) {
					      if (event.which === 1) {
					         $this.trigger('stop.owl.autoplay');
					      }
					   	});
					
					   	$this.on('mouseup', function(event) {
					      if (event.which === 1) {
					         $this.trigger('play.owl.autoplay');
					      }
					   	});
	                }
	
	                $parent.on('click', '.js-next-slide', function (e) {
	                    e.preventDefault();
	                    $this.trigger('next.owl.carousel');
	                });
	
	                $parent.on('click', '.js-prev-slide', function (e) {
	                    e.preventDefault();
	                    $this.trigger('prev.owl.carousel');
	                });
	
	                $parent.on('click', '.js-dot-item', function (e) {
	                    e.preventDefault();
	                    $this.trigger('to.owl.carousel', [$(this).index()]);
	                });
	
	                if (s3LP.is_cms) {
	                    setTimeout(function () {
	                    	if (typeof LpController !== 'undefined') {
		                        LpController.afterSave(function () {
		                            setTimeout(function () {
		                                $this.trigger('refresh.owl.carousel');
		                            }, 500);
		                        });
	                    	}
	                        $this.trigger('refresh.owl.carousel');
	                    }, 3000);
	                }
	
	                $win.on('load', function () {
	                    setTimeout(function () {
	                        $this.trigger('refresh.owl.carousel');
	
	                        if ($this.hasClass('js-lg-init')) {
	                            $this.data('lightGallery').destroy(true);
	                            $this.lightGallery({
	                                selector: '.owl-item:not(.cloned) .lg-item',
	                                share: false,
	                                hash: false,
	                                autoplayControls: false,
	                                actualSize: false,
	                                toogleThumb: false,
	                                getCaptionFromTitleOrAlt: false,
	                                download: false,
	                                thumbWidth: 64,
	                                thumbHeight: '64px',
	                                nextHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.98528 4.32805C9.3758 3.93753 10.009 3.93753 10.3995 4.32805L17.0563 10.9849C17.4469 11.3754 17.4469 12.0086 17.0563 12.3991L10.3995 19.056C10.009 19.4465 9.3758 19.4465 8.98528 19.056C8.59475 18.6654 8.59475 18.0323 8.98528 17.6418L14.935 11.692L8.98528 5.74226C8.59475 5.35174 8.59475 4.71857 8.98528 4.32805Z" fill="white"/></svg>',
	                                prevHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.8492 5.03516L8.19239 11.692L14.8492 18.3489" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
	                            });
	                        }
	                    }, 500);
	                });
	            }
	
	        });
	    }
	
	    if ($block.hasClass('lp-video-9-slides-wrapp')) {
	        $('.lp-video-9-slides-wrapp').on('changed.owl.carousel', function (event) {
	            $('.lp-video-9-slides-wrapp video').trigger('pause');
	            $('.lp-video-9-slides-wrapp ._lp-youtube-video').each(function () {
	                var el_src = $(this).attr("src");
	                $(this).attr("src", el_src);
	            });
	        })
	    }
	}
	
	lp_template.queue.adv17HalfHeight = function($self) {	
		var $block = $self.find('.js-advantages-17');
	
		$block.each(function(){
			var $this = $(this);
	
	
			$(window).on('resize', function(){
				calcMargin($this);
			});		
		});
	
		function calcMargin(e) {
			var itemHalfHeight = e.parent().find('.lp-advantages-17__item').eq(0).outerHeight() / 2;
			
			e.css({
				paddingBottom: itemHalfHeight,
				marginBottom: -itemHalfHeight
			});		
		};
	}
	
	lp_template.queue.video13 = function($self) {	
		var $block = $self.find('.js-video-13');
	
		$block.each(function(){
			var $this = $(this);
	
	
			$(window).on('resize', function(){
				calcMargin($this);
			});		
		});
	
		function calcMargin(e) {
			var itemHeight = e.parent().find('.lp-video-13__item-video').eq(0).outerHeight();
			
			e.css({
				paddingBottom: itemHeight,
				marginBottom: -itemHeight
			});		
		};
	}
	
	lp_template.queue.header15Popup = function($self) {
		var $block = $self.find('.lp-header-15');
		$block.find('.js-burger').on('click', function(){
			$(this).closest('.lp-wrapp').find('.js-menu__wrap').fadeIn().addClass('opened');
			$('body').css('overflow', 'hidden');
		});
		$block.find('.js-close, .js-bg').on('click', function(){
			$(this).closest('.lp-wrapp').find('.js-menu__wrap').removeClass('opened').fadeOut();
			$('body').css('overflow','visible');
		});
		
		$block.find('.js-menu a').on('click', function(){
		    setTimeout(function(){
		    	$block.find('.js-menu__wrap').removeClass('opened').fadeOut();
				$('body').css('overflow','visible');
		    },300);
		});
		
		$(document).keyup(function(e) {
		     if (e.key === "Escape") { // escape key maps to keycode '27'
		        $block.find('.js-menu__wrap.opened').removeClass('opened').fadeOut();
				$('body').css('overflow','visible');
		    }
		});
	}
	
	lp_template.queue.lpTriggerPopupBlock = function ($self) {
  		var $block = $self.find("[data-popup-type]");
  		
  		if($block.length){
  			document.addEventListener('lpcTriggerPopupInitDone', function(){
		    	lp_template.popupAdaptiveBlock();
		    });
  		}
  	};
	
	lp_template.queue.lpTimer = function($self) {
		var $block = $self.find('.js-lp-timer'),
			htmlLang = document.documentElement.lang,
			timerDays, timerHours, timerMinutes, timerSeconds, formatOut;
		
		if (htmlLang == 'de' || htmlLang == 'en') {
			timerDays = 'days';
			timerHours = 'hours';
			timerMinutes = 'minutes';
			timerSeconds = 'seconds'
	    } else {
			timerDays = 'Дней';
			timerHours = 'Часов';
			timerMinutes = 'Минут';
			timerSeconds = 'Секунд'
	    }
	    
	    var formatOut = '<div class="lp-ui-timer__item"><div class="lp-ui-timer__item-number" data-elem-type="text" data-lp-selector=".lp-ui-timer__item-number">%d</div><div class="lp-ui-timer__item-text lp-header-text-4" data-elem-type="text" data-lp-selector=".lp-ui-timer__item-text">' + timerDays + '</div></div><div class="lp-ui-timer__item"><div class="lp-ui-timer__item-number" data-elem-type="text" data-lp-selector=".lp-ui-timer__item-number">%h</div><div class="lp-ui-timer__item-text lp-header-text-4" data-elem-type="text" data-lp-selector=".lp-ui-timer__item-text">' + timerHours + '</div></div><div class="lp-ui-timer__item"><div class="lp-ui-timer__item-number" data-elem-type="text" data-lp-selector=".lp-ui-timer__item-number">%m</div><div class="lp-ui-timer__item-text lp-header-text-4" data-elem-type="text" data-lp-selector=".lp-ui-timer__item-text">' + timerMinutes + '</div></div><div class="lp-ui-timer__item"><div class="lp-ui-timer__item-number" data-elem-type="text" data-lp-selector=".lp-ui-timer__item-number">%s</div><div class="lp-ui-timer__item-text lp-header-text-4" data-elem-type="text" data-lp-selector=".lp-ui-timer__item-text">' + timerSeconds +'</div></div>';
	    var formatEnd = '<div class="lp-ui-timer__item"><div class="lp-ui-timer__item-number" data-elem-type="text" data-lp-selector=".lp-ui-timer__item-number">00</div><div class="lp-ui-timer__item-text lp-header-text-4" data-elem-type="text" data-lp-selector=".lp-ui-timer__item-text">' + timerDays + '</div></div><div class="lp-ui-timer__item"><div class="lp-ui-timer__item-number" data-elem-type="text" data-lp-selector=".lp-ui-timer__item-number">00</div><div class="lp-ui-timer__item-text lp-header-text-4" data-elem-type="text" data-lp-selector=".lp-ui-timer__item-text">' + timerHours + '</div></div><div class="lp-ui-timer__item"><div class="lp-ui-timer__item-number" data-elem-type="text" data-lp-selector=".lp-ui-timer__item-number">00</div><div class="lp-ui-timer__item-text lp-header-text-4" data-elem-type="text" data-lp-selector=".lp-ui-timer__item-text">' + timerMinutes + '</div></div><div class="lp-ui-timer__item"><div class="lp-ui-timer__item-number" data-elem-type="text" data-lp-selector=".lp-ui-timer__item-number">00</div><div class="lp-ui-timer__item-text lp-header-text-4" data-elem-type="text" data-lp-selector=".lp-ui-timer__item-text">' + timerSeconds +'</div></div>';
	    
	    
		
		if ($block.length) {
			$block.each(function(){
				var $this = $(this);
				
				$this.timer({
					format_in: "%d.%M.%y %h:%m:%s",
					language: htmlLang,
					update_time: s3LP.is_cms ? 100000 : 1000,
					format_out: formatOut,
					onEnd: function(){
						$this.html(formatEnd);
					}
				})
			});	
		}
	}
	
	
	lp_template.queue.popupFormHiddenInput = function ($self) {
  		if($doc.find("[data-alias='product_name']" && $doc.find("[data-form-hide-input]"))){
  			$doc.on("click", function (e) {
  				
  				if($(e.target).closest('.lp-popup-hide-input-check').length) {
  					var $this = $(this),
  					prodName = $(e.target).closest('.lp-product-name').find('[data-name-product]').data('name-product');
  						
  					$('.lp-popup-wrapper form input[data-alias=product_name]').val(prodName);
  				}
  			});
  		}
  		$('a[href^="popup:"]').on('click', function (){
	  		setTimeout(function() {
	  			if ($('.lp-popup-wrapper form').find('input[data-alias=product_name]').val() == ""){
	  				$('.lp-popup-wrapper form').find('input[data-alias=product_name]').val("Форма");
	  			}
	  		 }, 180);
	  	});
  	};
	
	lp_template.queue.menu11Popup = function($self) {
		var $block = $self.hasClass('lp-menu-11') ? $self : $self.find('.lp-menu-11');
		
		$($block).append('<div class="lp-menu-block-bg"></div>');
		
		if (!$block.length) return;
			
		$block.each(function(){
			var $this = $(this),
				contactsMobile = true,
				mobile = true;
			
			$(window).on('resize', function(){
				contactsMobile = contactsPend($this, contactsMobile);
				mobile = menuPend($this, mobile);
			});
		})
			
		function contactsPend($block, bool) {
		
			if (window.matchMedia('(max-width : 599px)').matches && !bool) {
				$block.find('.lp-menu-11__top').appendTo($block.find('.lp-menu-11__popup .lp-menu-11__menu_inner'));
				return true;
			}
			else if (window.matchMedia('(min-width : 600px)').matches && bool) {
				$block.find('.lp-menu-11__top').prependTo($block.find('.lp-menu-11-wrap_top .lp-wrapp'));
				return false;
			}
			
			return bool;
		}
		
		function menuPend($block, bool) {
			if (window.matchMedia('(max-width : 959px)').matches && !bool) {
				$block.find('.js-menu_appedable').prependTo($block.find('.lp-menu-11__popup'));
				$block.find('.lp-menu-11__burger').show().css('display', 'flex');
				return true;
			}
			else if (window.matchMedia('(min-width : 960px)').matches && bool) {
				$block.find('.lp-menu-11__logo').after($block.find('.js-menu_appedable'));
				return false;
			}
			
			return bool;
		}
		
		
	    var $popup = $block.find('.js-popup'),
    		popupHeight = $(window).height() - $block.height(),
    		menuHeight = $block.outerHeight(),
    		popupTop = menuHeight < 0 ? 0 : menuHeight,
    		popupTop = s3LP.is_cms ? popupTop + 72 : popupTop,
    		$bgTop = $block.height() + 50 < 0 ? 0 : $block.height() + 50,
    		$bgTop = s3LP.is_cms ? $bgTop + 72 : $bgTop;
    		
		$block.find('.lp-menu-block-bg').css({top: $bgTop});
		
    	$popup.css({top: popupTop});
    	
	
		$block.find('.js-burger').on('click', function(){
			if ($(this).hasClass('_in-side')) {
	    		$popup.animate({top: 0}, 200);
	    		$block.find('.lp-menu-block-bg').css('top', 0);
	    	}
			if (!$(this).hasClass('_in-side')) {
			    if (s3LP.is_cms) {
		    		$('html, body').animate({
					    scrollTop: $block.offset().top - 72
					}, 200);
		    	}
		    	else {
		    		$('html, body').animate({
					    scrollTop: $block.offset().top
					}, 200);
		    	}
			}
	    	
	    	$popup.css('overflow', 'auto');
	    	
	    	$block.find('.js-burger').toggleClass('opened');
	    	if ($(this).closest('.lp-menu-11').find('.js-popup').hasClass('opened')) {
	    		$(this).closest('.lp-menu-11').find('.js-popup').animate({height: "0%"}, 300,
	    			function() {
	    				$block.css('z-index', '');
	    			}
	    		).removeClass('opened');
	    		$block.find('.lp-menu-block-bg').fadeOut(300);
	    		
	    		$('html').css('overflow', '');
	    		if (s3LP.is_cms) {
	    			$('html').css('overflow', '');
	    		}
	    	}
	    	else {
	    		$(this).closest('.lp-menu-11').find('.js-popup').animate({height: popupHeight}, 800).addClass('opened');
	    		$block.find('.lp-menu-block-bg').fadeIn(800);
	    		$block.css('z-index', '30');
	    		$('html').css('overflow', 'hidden');
	    		if (s3LP.is_cms) {
	    			$('html').css('overflow', 'hidden');
	    		}
	    	}
	    	
	    });
	    
	    $(document).on('click', function(e) {
		    if(!$(e.target).closest('.lp-menu-11__popup, .lp-menu-11-button, .lp-block-menu-12__btn, .lp-block-menu-12__menu-in, .lp-menu-21__popup, .lp-menu-21-button').not(this).length){
		    	$(this).find('.js-popup').animate({height: "0%"}, 300,
	    			function() {
	    				$block.css('z-index', '');
	    			}
	    		).removeClass('opened');
	    		$(this).find('.lp-menu-block-bg').fadeOut(300);
	    		$block.find('.js-burger').removeClass('opened');
	    		$('html').css('overflow', '');
	    		if (s3LP.is_cms) {
	    			$('html').css('overflow', '');
	    		}
		    }
		});
	    
	    $block.find('.lp-menu-11__menu__link').on('click', function(){
	    	$block.find('.js-burger').toggleClass('opened');
			$popup.animate({height: "0%"}, 100,
    			function() {
    				$block.css('z-index', '');
    			}
    		).removeClass('opened');
    		$block.find('.lp-menu-block-bg').fadeOut(800);
    		$('html').css('overflow', '');
	    });
		
		$(window).on('resize', function(){
			var $ulWidth = 0,
				$ulWrapWidth = $block.find('.lp-menu-11__bot').innerWidth() - ($block.find('.lp-menu-11__logo').width() + $block.find('.lp-menu-11__right').outerWidth(true));
			$('li.lp-menu-11__menu__list-item').each(function(){
				var $width = $(this).outerWidth(true);
				$ulWidth += $width;
			});
			if (window.matchMedia('(min-width : 961px)').matches && ($ulWidth > $ulWrapWidth)) {
				$block.find('.js-menu_appedable').prependTo('.lp-menu-11__popup');
				$block.find('.lp-menu-11__burger').show().css('display', 'flex');
			}
			else if (window.matchMedia('(min-width : 961px)').matches && ($ulWidth < $ulWrapWidth)) {
				$block.find('.lp-menu-11__logo').after($block.find('.js-menu_appedable'));
				$block.find('.lp-menu-11__burger').hide();
			}
			
			
			
			menuHeight = $block.outerHeight(),
    		popupTop = menuHeight < 0 ? 0 : menuHeight,
    		popupTop = s3LP.is_cms ? popupTop + 72 : popupTop,
    		$bgTop = $block.height() + 50 < 0 ? 0 : $block.height() + 50,
    		$bgTop = s3LP.is_cms ? $bgTop + 72 : $bgTop;
			
			$popup.animate({top: popupTop});
	        
	    	$block.find('.lp-menu-block-bg').css('top', $bgTop);
		});
	}
	
	lp_template.queue.lpMapsEditorInit = function ($self) {
  		var $block = $self.find(".js-lp-simple-map");
  		
	  	if(s3LP.is_cms){
	  		$(document).ready(function() {
	  			if($block.hasClass('map-init')) {
	  				return;
	  			}
		  		if ($block.length) {
		  			setTimeout(function() {
		  				lp_template.initMaps($block);
		  			}, 200);
		  		}
	  		});
	  	}
  	}
	
	lp_template.queue.lpReviews10Slider = function($self) {
		var $block = $self.hasClass('lp-reviews-10') ? $self : $self.find('.lp-reviews-10');
	    var $slider = $block.find('.js-review-10-slider');
	    if ($slider.length) {
	
	        $slider.each(function(){
				
	            var $this = $(this);
	            var $parent = $this.closest('[data-block-layout]');
	            var $arrows = $this.data('arrows');
	            var $dots = $this.data('dots');
	            var $autoplay = $this.data('autoplay');
	            var $infinite = $this.data('infinite');
	            var $autoplaySpeed = $this.data('autoplay-speed');
	            var $speed = $this.data('speed');
	            var $slide = $this.find('.lp-reviews-10-slider__slide');
	            
	            if(s3LP.is_cms){
	                	var $infinite = false,
	              		$autoplay = false;
	                }
	              	else if(typeof ReactLPConstructor == 'object') {
	              		var $infinite = false,
	              		$autoplay = false;
	              	}
	
	            // это нужно для того, чтобы последний слайд всегда состоял из 3 отзывов
	            $slider.on('init', function(slick, currentSlide){
	                var slides = currentSlide.$slides;
	                var lastChild = slides[slides.length - 1];//Последний слайд
	                var children = lastChild.children;
	                var emptyDivs = [];
	
	                if(slides.length > 1) {
	
	                    for(var i = 0; i < children.length; i++) {
	                        if(children[i].childNodes.length < 1) {
	                            emptyDivs.push(children[i]);
	                        }
	                    }
	
	                    for(var j = 0; j < emptyDivs.length; j++) {
	                        emptyDivs[j].appendChild($slide[j].cloneNode(true));
	                    }
	                }
	            });
	
	            $this.slick({
	                infinite: $infinite,
	                mobileFirst: true,
	                // fade:$fade,
	                dots:$dots,
	                autoplay: $autoplay,
					autoplaySpeed: $autoplaySpeed,
					speed: $speed,
	                dotsClass:'lp-reviews-10-slider__dots',
	                appendDots:$parent.find('.lp-reviews-10-slider__dots-block'),
	                arrows:false,
	                appendArrows:$parent.find('.lp-reviews-10-slider__arrows-block'),
	                prevArrow:'<a href="#" data-elem-type="card_container" data-lp-selector=".lp-reviews-10-slider__arrows" class="lp-button lp-button--type-1 lp-reviews-10-slider__arrows lp-reviews-10-slider__arrows--left _v2-icon"><div class="_slider-arrows" data-elem-type="card_container" data-lp-selector="._slider-arrows-inner"><div class="_slider-arrows-inner"></div><div class="_slider-arrows-inner"></div></div></a>',
	                nextArrow:'<a href="#" data-elem-type="card_container" data-lp-selector=".lp-reviews-10-slider__arrows" class="lp-button lp-button--type-1 lp-reviews-10-slider__arrows lp-reviews-10-slider__arrows--right _v2-icon"><div class="_slider-arrows reverse" data-elem-type="card_container" data-lp-selector="._slider-arrows-inner"><div class="_slider-arrows-inner"></div><div class="_slider-arrows-inner"></div></div></a>',
	                responsive: [
	                    {
	                        breakpoint: 599.9,
	                        settings: {
	                            arrows:$arrows
	                        }
	                    },
	                    {
	                        breakpoint: 959.9,
	                        settings: {
	                            arrows:$arrows,
	                            slidesPerRow:1,
	                            rows:3
	
	                        }
	                    }
	                ]
	            });
	        });
	        $(window).on('resize', function(){
	        	setTimeout(function(){
	        		var $dotItem = $block.find('.lp-reviews-10-slider__dots li button');
	        		if ($dotItem.hasClass('lp-reviews-10-slider__dot')) {
	        			
	        		}
	        		else {
				        $dotItem.attr('data-elem-type', 'card_container');
				        $dotItem.addClass('lp-reviews-10-slider__dot');
				        $dotItem.attr('data-lp-selector','.lp-reviews-10-slider__dot');
	        		}
	        	},100);
	        });
	    }
	}
	
	lp_template.queue.lpForm19CalcBottomMargin = function($self) {
		var $block = $self,
			margin = ($block.find('.lp-form-19__bottom').height()
								+ parseInt($(".lp-form-19__bottom").css("padding-top"))
				 				+ parseInt($(".lp-form-19__bottom").css("padding-bottom")))/2;
		$block.find('.lp-form-19__top-bg').css({
			"margin-bottom" : - margin						
		});
	};
	
	lp_template.queue.lpGallery1 = function($self) {
		var $block = $self.hasClass('lp-gallery-1') ? $self : $self.find('.lp-gallery-1'),
	    	$mainSlider = $block.find('.js-main-slick'),
	    	$thumbSlider = $block.find('.js-thumb-slick'),
	    	$prevBtn = $block.find('.js-slider-prev'),
	    	$nextBtn = $block.find('.js-slider-next'),
			$slidesToShowData = $block.data('count');
	
		if ($mainSlider.length) {
		    $mainSlider.slick({
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        arrows: false,
		        fade: true,
		        asNavFor: $thumbSlider,
		        adaptiveHeight: false
		    })
		
		    $thumbSlider.slick({
		        slidesToShow: 3,
		        slidesToScroll: 1,
		        asNavFor: $mainSlider,
		        dots: false,
		        centerMode: true,
		        arrows: false,
		        touches: true,
		        prevArrow: $prevBtn,
		        nextArrow: $nextBtn,
		        focusOnSelect: true,
		        adaptiveHeight: false,
		        centerPadding: '6px',
		        mobileFirst: true,
		        swipeToSlide: false,
		        responsive: [
		            {
		                breakpoint: 600,
		                settings: {
		                    slidesToShow: $slidesToShowData,
		                    centerPadding: '20px'
		                }
		            },
		            {
		                breakpoint: 960,
		                settings: {
		                    slidesToShow: $slidesToShowData,
		                    arrows: true,
		                    centerPadding: '0px'
		                }
		            }
		        ]
		    });
	    }
	};
	
	lp_template.queue.lpGallery3 = function ($self) {

		var $block = $self,
			owl = $block.find('.js-photo-3-mask'),
			$nextSlide = $block.find('.js-next-slide'),
			$prevSlide = $block.find('.js-prev-slide'),
			$thumbItem = $block.find('.js-preview-item');
		
		if (owl.length) {
		
			owl.owlCarousel({
				items : 1,
				autoplay : false,
				loop : false,
				nav : false,
				dots : false,
				animateIn: 'fadeIn',
				animateOut: 'fadeOut',
				smartSpeed: 300,
				mouseDrag: false,
				touchDrag: false
			});
		
		
			$($nextSlide).click(function(e) {
				e.preventDefault();
			    owl.trigger('next.owl.carousel');
			});
			$($prevSlide).click(function(e) {
				e.preventDefault();
			    owl.trigger('prev.owl.carousel', [300]);
			});
		
			$($thumbItem).on('click', function () {
			    var click = $(this).index();
			    owl.trigger( 'to.owl.carousel', [click] );
			    $(this).addClass('_active').siblings().removeClass('_active');
			});
		}
	};
	
	lp_template.queue.products29 = function($self) {
	  $self.on('click', '.js-gallery29-item', function(){
	    var $this = $(this);
	
	    $this.addClass('_active').siblings().removeClass('_active');
	    $this.closest('[data-block-layout]').find('.lp-prods-29-background__item').removeClass('_active').eq($this.index()).addClass('_active');
	
	  });
	}
	

	
	lp_template.queue.lpGallery17 = function($self) {
		
		var $block = $self.hasClass('js-grid-gallery') ? $self : $self.find('.js-grid-gallery');
		
		$block.each(function(){
			if ($block.length) {
				var $this = $(this),
					$slider = $this.find('.js-gallery-items'),
					autoplay = !!$slider.data('autoplay'),
					infinite = !!$slider.data('infinite'),
					nav = !!$slider.data('arrows'),
					dotsEach = !!$slider.data('dots-each'),
					dots = true,
					pause = $slider.data('pause') || 5000,
					speed = $slider.data('speed') || 250,
					fade = !!$slider.data('fade'),
					$parent = $slider.closest('[data-block-layout]'),
					dataResponse = $slider.data('response'),
					response = {},
					$dots = $this.find('.lp-dots-wrapper'),
					navigatoBox = $this.find('.lp-gallery-17-items__nav');
					
					if(s3LP.is_cms){
	                	var infinite = false,
	                	rewind = true,
	              		autoplay = false;
	                }
	              	else if(typeof ReactLPConstructor == 'object') {
	              		var infinite = false,
	              		rewind = true,
	              		autoplay = false;
	              		
	              	}
					
			    try {
			        let owl = $this.find('.js-gallery-items.js-owl-carousel'),
			            windowWidth = $(window).width(),
			            gridFormer = function(){
			            let wrapper = '<div class="js-gallery-items-grid"></div>',
			                itemsCount = $slider.children('.js-gallery-item').length,
			                sliceFunc = function(itemsInGrid){
			                    for (var i = 0; i < itemsCount/itemsInGrid; i++) {
			                        $slider.children('.js-gallery-item').slice(0, itemsInGrid).wrapAll(wrapper);
			                    }
			                    $slider.find('.js-gallery-items-grid').each(function(){
			                        $(this).addClass('_'+$(this).children().length);
			                    });
			                };
		
			            if (windowWidth<600) {
			                sliceFunc(2);                   
			            } else if (windowWidth<1200) {
			                sliceFunc(4);
			            } else {
			                sliceFunc(5);
			            }
			        }
		
			        let initOwl = function(){
		
			            $slider.owlCarousel($.extend({
							items : 1,
							autoplay : autoplay,
							loop : infinite,
			                rewind: true,
							nav : nav,
							dots : dots,
							animateIn: fade ? 'fadeIn' : false,
							animateOut: fade ? 'fadeOut' : false,
							smartSpeed: speed,
							autoplayTimeout: pause,
			                margin: 16,
							onInitialized: function(e) {
							
								var $dotsCount = $this.find('.owl-dot').length;
								
								if (!$dots.length || $dotsCount < 2) {
									$dots.html('');
									return;
								};
								var $dotsHTML = '';
								
								for(var i = 0; i < $dotsCount; i++) {
									$dotsHTML += '<div class="lp-dots-item js-dot-item" data-elem-type="container" data-lp-selector=".lp-dots-item"></div>';
								} 
								
								if (!$dots.hasClass('_unchanged')) {
								
									$dots.html($dotsHTML);
								
								}
								
								$dots.find('.lp-dots-item').eq(0).addClass('active');
								
							},
							
							onResized: function(e) {
								if (!$dots.length || e.page.count < 2) {
									$dots.html('');
									return;
								}
								
								var $dotsHTML = '';
								for(var i = 0; i < e.page.count; i++) {
									$dotsHTML += '<div class="lp-dots-item js-dot-item" data-elem-type="container" data-lp-selector=".lp-dots-item"></div>';
								}
								
								if (!$dots.hasClass('_unchanged')) {
									$dots.html($dotsHTML);
								}
								$dots.find('.lp-dots-item').removeClass('active');
								$dots.find('.lp-dots-item').eq(e.page.index).addClass('active');
							},
							onTranslated: function(e) {
								$dots.find('.lp-dots-item').removeClass('active');
								$dots.find('.lp-dots-item').eq(e.page.index).addClass('active');
							}
						}, response));
						
						$this.find('.js-next-slide').off();
						$this.find('.js-next-slide').on('click', function(e) {
							e.preventDefault();
							owl.trigger('next.owl.carousel');
						});
						
						$this.find('.js-prev-slide').off();
						$this.find('.js-prev-slide').on('click', function(e) {
							e.preventDefault();
							owl.trigger('prev.owl.carousel');
						});
						
						var $itemCount = $this.find('.owl-item').length;

						if ($itemCount > 1) {
							navigatoBox.show();
						} else {
							navigatoBox.hide();
						};
						
						// Получаем все точки
						const $dotsItems = $dots.find('.lp-dots-item');
					
						// Событие клика на точки
						$dotsItems.on('click', function() {
							const index = $(this).index();
							owl.trigger('to.owl.carousel', index);
						});
		
			        }
		
			        let reInitOwl = function(){
			            owl.trigger('destroy.owl.carousel');
			            $this.find('.js-gallery-item').unwrap();
			            gridFormer();
			            initOwl();
			        }
		
			        gridFormer();
			        
			        initOwl();
		
		
			        $(window).resize(function(){                
			            let newWindowWidth = $(window).width();
			            if (windowWidth < 1200 && windowWidth >= 600) {                 
			                if (newWindowWidth >= 1200 || newWindowWidth < 600) {
			                    windowWidth = newWindowWidth;
			                    reInitOwl();
			                }
			            } else if (windowWidth>=1200){
			                if (newWindowWidth < 1200) {
			                    windowWidth = newWindowWidth;
			                    reInitOwl();
			                }
			            } else if (windowWidth<600){
			                if (newWindowWidth>=600) {
			                    windowWidth = newWindowWidth;
			                    reInitOwl();
			                }
			            }
			        });
		
			    } catch(exception) {
			        console.log(exception);
			    }
		    }
		});
	}
	
	lp_template.queue.lpGallery19 = function($self) {
		
		var $block = $self.hasClass('lp-gallery-19') ? $self : $self.find('.lp-gallery-19');
		
		$block.each(function(){
			if ($block.length) {
				var $this = $(this),
					$slider = $this.find('.js-gallery-items'),
					autoplay = !!$slider.data('autoplay'),
					infinite = !!$slider.data('infinite'),
					nav = !!$slider.data('arrows'),
					dotsEach = !!$slider.data('dots-each'),
					dots = true,
					pause = $slider.data('pause') || 5000,
					speed = $slider.data('speed') || 250,
					fade = !!$slider.data('fade'),
					$parent = $slider.closest('[data-block-layout]'),
					dataResponse = $slider.data('response'),
					response = {},
					$dots = $this.find('.lp-dots-wrapper');
					
					if(s3LP.is_cms){
	                	var infinite = false,
	              		autoplay = false;
	                }
	              	else if(typeof ReactLPConstructor == 'object') {
	              		var infinite = false,
	              		autoplay = false;
	              		
	              	}
			    try {
			        let owl = $this.find('.js-gallery-items.js-owl-carousel'),
			            windowWidth = $(window).width(),
			            gridFormer = function(){
			            let wrapper = '<div class="lp-gallery-19__slider-item"></div>',
			                itemsCount = $slider.children('.js-gallery-item').length,
			                sliceFunc = function(itemsInGrid){
			                    for (var i = 0; i < itemsCount/itemsInGrid; i++) {
			                        $slider.children('.js-gallery-item').slice(0, itemsInGrid).wrapAll(wrapper);
			                    }
			                    $slider.find('.lp-gallery-19__slider-item').each(function(){
			                        $(this).addClass('_'+$(this).children().length);
			                    });
			                };
		
			            if (windowWidth<600) {
			                sliceFunc(1);                   
			            } else if (windowWidth<1200) {
			                sliceFunc(4);
			            } else {
			                sliceFunc(4);
			            }
			        }
		
			        let initOwl = function(){
		
			            $slider.owlCarousel($.extend({
							items : 1,
							autoplay : autoplay,
							loop : infinite,
			                rewind: true,
							nav : nav,
							dots : dots,
							animateIn: fade ? 'fadeIn' : false,
							animateOut: fade ? 'fadeOut' : false,
							smartSpeed: speed,
							autoplayTimeout: pause,
			                margin: 16,
							onInitialized: function(e) {
								var $dotsCount = $this.find('.owl-dot').length;
								
								if (!$dots.length || $dotsCount < 2) {
									$dots.html('');
									return;
								};
								var $dotsHTML = '';
								
								for(var i = 0; i < $dotsCount; i++) {
									$dotsHTML += '<div class="lp-dots-item js-dot-item" data-elem-type="container" data-lp-selector=".lp-dots-item"></div>';
								} 
								
								if (!$dots.hasClass('_unchanged')) {
								
									$dots.html($dotsHTML);
								
								}
								
								$dots.find('.lp-dots-item').eq(0).addClass('active');
								
							},
							
							onResized: function(e) {
								if (!$dots.length || e.page.count < 2) {
									$dots.html('');
									return;
								}
								
								var $dotsHTML = '';
								for(var i = 0; i < e.page.count; i++) {
									$dotsHTML += '<div class="lp-dots-item js-dot-item" data-elem-type="container" data-lp-selector=".lp-dots-item"></div>';
								}
								
								if (!$dots.hasClass('_unchanged')) {
									$dots.html($dotsHTML);
								}
								$dots.find('.lp-dots-item').removeClass('active');
								$dots.find('.lp-dots-item').eq(e.page.index).addClass('active');
							},
							onTranslated: function(e) {
								$dots.find('.lp-dots-item').removeClass('active');
								$dots.find('.lp-dots-item').eq(e.page.index).addClass('active');
							}
						}, response));
						$this.find('.js-next-slide').off();
						$this.find('.js-next-slide').on('click', function(e) {
							e.preventDefault();
							owl.trigger('next.owl.carousel');
						});
						$this.find('.js-prev-slide').off();
						$this.find('.js-prev-slide').on('click', function(e) {
							e.preventDefault();
							owl.trigger('prev.owl.carousel');
						});
		
			        }
		
			        let reInitOwl = function(){
			            owl.trigger('destroy.owl.carousel');
			            $this.find('.js-gallery-item').unwrap();
			            gridFormer();
			            initOwl();
			        }
		
			        gridFormer();
			        
			        initOwl();
		
			        $(window).resize(function(){                
			            let newWindowWidth = $(window).width();
			            if (windowWidth < 1200 && windowWidth >= 600) {                 
			                if (newWindowWidth >= 1200 || newWindowWidth < 600) {
			                    windowWidth = newWindowWidth;
			                    reInitOwl();
			                }
			            } else if (windowWidth>=1200){
			                if (newWindowWidth < 1200) {
			                    windowWidth = newWindowWidth;
			                    reInitOwl();
			                }
			            } else if (windowWidth<600){
			                if (newWindowWidth>=600) {
			                    windowWidth = newWindowWidth;
			                    reInitOwl();
			                }
			            }
			        });
		
			    } catch(exception) {
			        console.log(exception);
			    }
		    }
		});
	}
	
	lp_template.queue.blockAfterBefore = function ($self) {
		var $block = $self.find(".lp-before-and-after-init");
	
		if ($block.length) {
			(() => {'use strict';
	
				class BeforeAfter {
					constructor(selector = '.before-after') {
						this.selector = selector;
						this.items = [];
					}
	
					init() {
						let wrappers = document.querySelectorAll(this.selector);
	
						for (let wrapper of wrappers) {
							if (wrapper.dataset.beforeAfterInitialized === 'true') {
								continue;
							}
							let item = new BeforeAfterItem(wrapper).init();
							this.items.push(item);
							
							wrapper.dataset.beforeAfterInitialized = 'true';
							
							let observer = new MutationObserver(function (mutations) {
								mutations.forEach(function (mutation) {
									if ($(mutation.target).hasClass('lp-selected-element')) {
										$(mutation.target).parent().addClass('active');
									} else {
										$(mutation.target).parent().removeClass('active');
									}
								});
							});
							let config = {
								attributes: true,
								attributeFilter: ['class']
							};
							
							observer.observe($(wrapper).find('.before-after__img-before')[0], config);
							observer.observe($(wrapper).find('.before-after__img-after')[0], config);
						}
					}
				}
	
				class BeforeAfterItem {
					constructor(el) {
						this.wrapper = el;
						this.dragElWrapper = null;
						this.viewport = null;
						this.before = null;
						this.after = null;
						this.offset = 0;
						this.pageXStart = 0;
						this.startOffset = 0;
						this.onPointerDown = this.onPointerDown.bind(this);
						this.onPointerMove = this.onPointerMove.bind(this);
						this.onPointerUp = this.onPointerUp.bind(this);
					}
					init() {
						let wrapper = this.wrapper;
	
						let dragElWrapper = this.dragElWrapper = document.createElement('div');
	
						dragElWrapper.classList.add('before-after__drag-wrapper');
						dragElWrapper.style.left = '50%';
	
						let dragEl = document.createElement('div');
	
						dragEl.classList.add('before-after__drag');
	
						dragElWrapper.append(dragEl);
	
						let viewport = this.viewport = wrapper.querySelector('.before-after__viewport');
	
						viewport.append(dragElWrapper);
						wrapper.classList.add('before-after--loaded');
	
						this.before = viewport.querySelector('.lp-image-before');
						this.after = viewport.querySelector('.lp-image-after');
	
						this.move(this.offset);
	
						dragElWrapper.addEventListener('mousedown', this.onPointerDown);
						dragElWrapper.addEventListener('touchstart', this.onPointerDown);
	
						dragElWrapper.addEventListener('dragstart', () => {
							return false;
						});
	
						return this;
					}
	
					onPointerDown(e) {
						e.stopPropagation();
	
						if (e.touches) {
							this.pageXStart = e.touches[0].pageX;
						} else {
							this.pageXStart = e.pageX;
						}
						this.startOffset = this.offset;
	
						document.addEventListener('mousemove', this.onPointerMove);
						document.addEventListener('touchmove', this.onPointerMove);
						document.addEventListener('mouseup', this.onPointerUp);
						document.addEventListener('touchend', this.onPointerUp);
					}
	
					onPointerMove(e) {
						let viewport = this.viewport,
							pxOffset = 0,
							percentOffset = 0;
	
						if (e.touches) {
							pxOffset = e.touches[0].pageX - this.pageXStart;
						} else {
							pxOffset = e.pageX - this.pageXStart;
						}
	
						percentOffset = parseFloat((pxOffset / viewport.clientWidth * 100).toFixed(6));
	
						this.offset = this.startOffset + percentOffset;
	
						if (this.offset >= 50) {
							this.offset = 50;
						} else if (this.offset <= -50) {
							this.offset = -50;
						}
	
						this.move(this.offset);
					}
	
					onPointerUp() {
						document.removeEventListener('mousemove', this.onPointerMove);
						document.removeEventListener('touchmove', this.onPointerMove);
						document.removeEventListener('mouseup', this.onPointerUp);
						document.removeEventListener('touchend', this.onPointerUp);
					}
	
					move(offset) {
						this.dragElWrapper.style.left = 'calc(50% + ' + offset + '%)';
						this.before.style.clipPath = 'inset(0 calc(50% - ' + offset + '%) 0 0)';
						this.after.style.clipPath = 'inset(0 0 0 calc(50% + ' + offset + '%))';
					}
	
				}
				window.BeforeAfter = BeforeAfter;
			})();
	
			new BeforeAfter().init();
		}
	}
	
	lp_template.queue.lpGallery23 = function($self) {
		var $block = $('.lp-gallery-23');
		if ($block.length) {
			$block.each(function(){
				var $this = $(this),
					$thisCount = $this.hasClass('_3') ? 4 : 3,
					$button = $this.find('.lp-gallery-23__button'),
					openText = $this.find('.lp-gallery-23__button-in._open-text'),
					closeText = $this.find('.lp-gallery-23__button-in._close-text'),
					$hiddenElems;
				
				
				try {
			        let itemMargin = 0,
			        	itemHeight = 0,
			        	containerHeight = 0,
						checkHeight = function(){
					        itemMargin = parseInt($this.find('.lp-gallery-23-item').css('margin-bottom'), 10),
				        	itemHeight = $this.find('.lp-gallery-23-item').height() + itemMargin,   	
				        	containerHeight = $this.find('.lp-gallery-23-items-wrapper').height()
							$thisCount = $this.hasClass('_3') ? 4 : 3;
		
					        if ($(window).width()<600 && itemHeight < 590) {
					        	itemHeight *= 2;
					        }
					        
					        if  ($(window).width()<600) {
					        	$thisCount = 2;
					        }
					        else if ($(window).width()<960) {
					        	$thisCount = 3;
					        }
					        
					        $hiddenElems = $this.find('.lp-gallery-23-item:nth-child(n + ' + $thisCount + ')');
		
			        		$this.find('.lp-gallery-23-items').css('max-height', itemHeight);
							$this.find('.lp-gallery-23-item').show();
							$hiddenElems.hide();
				    	};
				    	
				    checkHeight();
		
			        /*$(window).resize(function(){
			        	$button.removeClass('_opened');
		        		closeText.hide();
		        		openText.show();
			        	checkHeight();
			        });*/
			        
			        var win_width=$(window).width();
					$(window).resize(function() {
					    var new_win_width=$(window).width();
					    if(new_win_width!=win_width) {       
					    	$button.removeClass('_opened');
							closeText.hide();
							openText.show();
					    	checkHeight();
					        win_width=new_win_width;
					    }
					});
		
			        $button.on('click', function(e){
			        	if ($(this).hasClass('_opened')) {
			        		$this.find('.lp-gallery-23-items').animate({
			        			'max-height': itemHeight
			        		}, 1000	);
			        		closeText.hide();
			        		openText.show();
			        		$hiddenElems.fadeOut();
			        	} else {
			        		$this.find('.lp-gallery-23-items').animate({
			        			'max-height': 100000
			        		}, 1000);
			        		closeText.show();
			        		openText.hide();
			        		$hiddenElems.fadeIn();
			        	}
			        	$(this).toggleClass('_opened');
			        });
		
		
				} catch(exception) {
					console.log(exception);
				}
			
			});
		}
	}
	
	lp_template.queue.lpGallery25 = function($self) {
		var $block = $('.lp-gallery-25');
		if ($block.length) {
			try {
				let bgPos = function(){
					if ($(window).width()<960) {
						let headerHeight = $('.lp-gallery-25__title').outerHeight();
						$('.lp-gallery-25 .lp-half-bg').css({
								top: headerHeight,
								left: 0,
								right: 0
						});
					} else {
						let headerWidth = 0;
		
						$('.lp-gallery-25 .lp-half-bg').css('top', 0);
						if ($('.lp-gallery-25').hasClass('_reverse')) {
							headerWidth = $('.lp-gallery-25__title').outerWidth() + $('.lp-gallery-25-items').offset().left;
							$('.lp-gallery-25 .lp-half-bg').css({
									right: headerWidth,
									left: 0
							});
						} else {
							headerWidth = $('.lp-gallery-25__title').outerWidth() + $('.lp-gallery-25__title').offset().left;
							$('.lp-gallery-25 .lp-half-bg').css({
									right: 0,
									left: headerWidth
							});
						}
					}
				}
		
				if ($('div').is(".lp-gallery-25__title")) {
					if (s3LP.is_cms && !$('body').hasClass('preview_mode')) {
						setTimeout(function(){
							bgPos();
						},500);
					}
					
					$(window).resize(function(){
						bgPos();
					});
				}
		
			} catch(exception) {
				console.log(exception);
			}
		}
	}
	
	lp_template.queue.lpCertificate15 = function($self) {
		
		var $block = $self.hasClass('lp-certificate-15') ? $self : $self.find('.lp-certificate-15');
		
		$block.each(function(){
			if ($block.length) {
				var $this = $(this),
					$slider = $this.find('.js-gallery-items'),
					autoplay = !!$slider.data('autoplay'),
					infinite = !!$slider.data('infinite'),
					nav = !!$slider.data('arrows'),
					dotsEach = !!$slider.data('dots-each'),
					dots = true,
					pause = $slider.data('pause') || 5000,
					speed = $slider.data('speed') || 250,
					fade = !!$slider.data('fade'),
					$parent = $slider.closest('[data-block-layout]'),
					dataResponse = $slider.data('response'),
					response = {},
					$dots = $this.find('.lp-dots-wrapper');
					
					if(s3LP.is_cms){
	                	var infinite = false,
	              		autoplay = false;
	                }
	              	else if(typeof ReactLPConstructor == 'object') {
	              		var loop = false,
	              		autoplay = false;
	              		
	              	}
			    try {
			        let owl = $this.find('.js-gallery-items'),
			            windowWidth = $(window).width(),
			            gridFormer = function(){
			            let wrapper = '<div class="lp-certificate-15__slider-item-wr"></div>',
			                itemsCount = $slider.children('.js-gallery-item').length,
			                sliceFunc = function(itemsInGrid){
			                    for (var i = 0; i < itemsCount/itemsInGrid; i++) {
			                        $slider.children('.js-gallery-item').slice(0, itemsInGrid).wrapAll(wrapper);
			                    }
			                    $slider.find('.lp-certificate-15-slider-item').each(function(){
			                        $(this).addClass('_'+$(this).children().length);
			                    });
			                };
		
			            if (windowWidth<600) {
			                sliceFunc(1);                   
			            } else if (windowWidth<1200) {
			                sliceFunc(2);
			            } else {
			                sliceFunc(2);
			            }
			        }
			        
			        let initOwl = function(){
		
					    $slider.owlCarousel($.extend({
					        items : 1,
					        autoplay : autoplay,
					        loop : infinite,
					        rewind: true,
					        nav : nav,
					        dots : dots,
					        animateIn: fade ? 'fadeIn' : false,
					        animateOut: fade ? 'fadeOut' : false,
					        smartSpeed: speed,
					        autoplayTimeout: pause,
					        margin: 0,
					        onInitialized: function(e) {
					            var $dotsCount = $this.find('.owl-dot').length;
					            
					            if (!$dots.length || $dotsCount < 2) {
					                $dots.html('');
					                return;
					            };
					            var $dotsHTML = '';
					            
					            for(var i = 0; i < $dotsCount; i++) {
					                $dotsHTML += '<div class="lp-dots-item js-dot-item" data-elem-type="container" data-lp-selector=".lp-dots-item"></div>';
					            } 
					            
					            if (!$dots.hasClass('_unchanged')) {
					                $dots.html($dotsHTML);
					            }
					            
					            $dots.find('.lp-dots-item').eq(0).addClass('active');
					
					            // обработка кликов по кастомным точкам
					            $dots.off('click', '.lp-dots-item').on('click', '.lp-dots-item', function() {
					                var index = $(this).index();
					                $slider.trigger('to.owl.carousel', [index, 300]);
					            });
					
					        },
					        
					        onResized: function(e) {
					            if (!$dots.length || e.page.count < 2) {
					                $dots.html('');
					                return;
					            }
					            
					            var $dotsHTML = '';
					            for(var i = 0; i < e.page.count; i++) {
					                $dotsHTML += '<div class="lp-dots-item js-dot-item" data-elem-type="container" data-lp-selector=".lp-dots-item"></div>';
					            }
					            
					            if (!$dots.hasClass('_unchanged')) {
					                $dots.html($dotsHTML);
					            }
					            $dots.find('.lp-dots-item').removeClass('active');
					            $dots.find('.lp-dots-item').eq(e.page.index).addClass('active');
					
					            // обновляем обработчик при ресайзе
					            $dots.off('click', '.lp-dots-item').on('click', '.lp-dots-item', function() {
					                var index = $(this).index();
					                $slider.trigger('to.owl.carousel', [index, 300]);
					            });
					        },
					        onTranslated: function(e) {
					            $dots.find('.lp-dots-item').removeClass('active');
					            $dots.find('.lp-dots-item').eq(e.page.index).addClass('active');
					        }
					    }, response));
					
					    $this.find('.js-next-slide').off();
					    $this.find('.js-next-slide').on('click', function(e) {
					        e.preventDefault();
					        $slider.trigger('next.owl.carousel');
					    });
					    $this.find('.js-prev-slide').off();
					    $this.find('.js-prev-slide').on('click', function(e) {
					        e.preventDefault();
					        $slider.trigger('prev.owl.carousel');
					    });
					}
		
			        let reInitOwl = function(){
			            owl.trigger('destroy.owl.carousel');
			            $this.find('.js-gallery-item').unwrap();
			            gridFormer();
			            initOwl();
			        }
		
			        gridFormer();
			        
			        initOwl();
		
			        $(window).resize(function(){                
			            let newWindowWidth = $(window).width();
			            if (windowWidth < 1200 && windowWidth >= 600) {                 
			                if (newWindowWidth >= 1200 || newWindowWidth < 600) {
			                    windowWidth = newWindowWidth;
			                    reInitOwl();
			                }
			            } else if (windowWidth>=1200){
			                if (newWindowWidth < 1200) {
			                    windowWidth = newWindowWidth;
			                    reInitOwl();
			                }
			            } else if (windowWidth<600){
			                if (newWindowWidth>=600) {
			                    windowWidth = newWindowWidth;
			                    reInitOwl();
			                }
			            }
			        });
		
			    } catch(exception) {
			        console.log(exception);
			    }
		    }
		});
	}
	
	lp_template.queue.lpPromo10 = function($self) {
		var $block = $self,
			$block_slider = $block.find('.js-promo10-slider');
		
		if ($block_slider.length) {
			$block_slider.each(function(){
				
				var $this = $(this),
					$parent = $this.closest('[data-block-layout]'),
					$dots = $this.data('dots'),
					$autoplay = $this.data('autoplay'),
					$infinite = $this.data('infinite'),
					$autoplaySpeed = $this.data('autoplay-speed'),
					$speed = $this.data('speed');
				
				$this.slick({
				    arrows: false,
				    dots: $dots,
				    infinite: $infinite,
				    fade: true,
				    speed: $speed,
				    slidesToShow: 1,
				    autoplay: $autoplay,
				    autoplaySpeed: $autoplaySpeed,
				    dotsClass:'lp-promo10__slider-dots',
				    appendDots:$this
				});
			});
			
			$(window).on('resize', function(){
	        	setTimeout(function(){
	        		var $dotItem = $block.find('.lp-promo10__slider-dots li button');
	        		if ($dotItem.hasClass('lp-promo10__slider-dot')) {
	        			
	        		}
	        		else {
				        $dotItem.attr('data-elem-type', 'card_container');
				        $dotItem.addClass('lp-promo10__slider-dot');
				        $dotItem.attr('data-lp-selector','.lp-promo10__slider-dot');
				        $dotItem.attr('data-has-event','1');
	        		}
	        	},500);
	        });
		}
	}
	
	lp_template.queue.lpPromo12 = function ($self) {

	    var $block = $self,
	    	$slider = $self.find('.js-promo12-slider');
	
	    if ($slider.length) {
	        $slider.each(function(){
	
	            let $this = $(this);
	            let $parent = $this.closest('[data-block-layout]');
	            
	            var $dots = $this.data('dots'),
					$autoplay = $this.data('autoplay'),
					$infinite = $this.data('infinite'),
					$autoplaySpeed = $this.data('autoplay-speed'),
					$speed = $this.data('speed');
					if(s3LP.is_cms){
	                	var $infinite = false,
	              		$autoplay = false;
	                }
	              	else if(typeof ReactLPConstructor == 'object') {
	              		var $infinite = false,
	              		$autoplay = false;
	              	}
	
	            $this.slick({
	                slidesToShow: 1,
	                slidesToScroll: 1,
	                fade: true,
	                infinite: $infinite,
	                dots: $dots,
	                autoplay: $autoplay,
				    autoplaySpeed: $autoplaySpeed,
				    speed: $speed,
	                dotsClass: 'lp-promo-12-slider__dots',
	                appendDots: $parent.find('.lp-promo-12-slider'),
	                prevArrow: $parent.find('.lp-promo-12-slider__arrow--left'),
	                nextArrow: $parent.find('.lp-promo-12-slider__arrow--right')
	            });
	            
	            $(window).on('resize', function(){
		        	setTimeout(function(){
		        		var $dotItem = $block.find('.lp-promo-12-slider__dots li button');
		        		if ($dotItem.hasClass('lp-promo-12-slider__dot')) {
		        			
		        		}
		        		else {
					        $dotItem.attr('data-elem-type', 'card_container');
					        $dotItem.addClass('lp-promo-12-slider__dot');
					        $dotItem.attr('data-lp-selector','.lp-promo-12-slider__dot');
					        $dotItem.attr('data-has-event','1');
		        		}
		        	},100);
		        });
	        });
	    }
	}
	
	lp_template.queue.lpPromo17 = function ($self) {

	    var $slider = $self.find('.js-promo-17-slider');
	
	    if ($slider.length) {
	        $slider.each(function(){
	
	            var $this = $(this);
	            var $parent = $this.closest('[data-block-layout]');
	
	            $this.slick({
	                infinite: true,
	                slidesToShow: 1,
	                slidesToScroll: 1,
	                fade: true,
	                dots:true,
	                dotsClass: 'lp-promo-17__dots',
	                appendDots: $parent.find('.lp-promo-17'),
	                prevArrow: $parent.find('.lp-promo-17__slider-arrow--left'),
	                nextArrow: $parent.find('.lp-promo-17__slider-arrow--right')
	            });
	        });
	    }
	}
	
	lp_template.queue.check_age = function($self) {
		$self.on('click', '.js-close-popup.lp-popup-block-3__button', function(e){
			e.preventDefault();
			var $parent = $(this).closest('[data-block-id]');
			createCookie('block_' + $parent.data('block-id'), 1, 30);
		});

		$self.on('click', '.js-little-age', function(e) {
			e.preventDefault();
			var $parent = $(this).closest('[data-block-id]');

			$parent.find('.lp-popup-block-3__confirm').hide();
			$parent.find('.lp-popup-block-3__alert').show();			

			createCookie('little_age', 1, 30);
		});

		function createCookie(name,value,days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else var expires = "";
			document.cookie = name+"="+encodeURIComponent(value)+expires+"; path=/";
		}
	}
	
	lp_template.queue.certificates8 = function($self) {

	    var $block = $self.hasClass('lp-certificate-8') ? $self : $self.find('.lp-certificate-8');
	    
	    $block.each(function(){
		    var $this = $(this),
		    	$imageSlider = $this.find('.js-image-slider'),
		        $textSlider = $this.find('.js-text-slider'),
		        $sliderArrows = $this.find('.js-slider-arrows'),
		        $autoplay = $imageSlider.data('autoplay'),
				$pause = $imageSlider.data('pause'),
				$speed = $imageSlider.data('speed'),
				$dots = $imageSlider.data('dots'),
				$infinite = !!$imageSlider.data('infinite');
				if(s3LP.is_cms){
	                	var $infinite = false,
	              		$autoplay = false;
	                }
	              	else if(typeof ReactLPConstructor == 'object') {
	              		var $infinite = false,
	              		$autoplay = false;
	              	}
		
		    if ($('.lp-certificate-8__content').length) {
		        if ($imageSlider.find('.js-image-slider-item').length > 3) {
		            $imageSlider.slick({
		                asNavFor: $textSlider,
		                prevArrow: $this.find('.js-prev-slide'),
		                nextArrow: $this.find('.js-next-slide'),
		                mobileFirst: true,
		                slidesToScroll: 1,
		                slidesToShow: 1,
		                centerMode: true,
		                centerPadding: '0',
		                focusOnSelect: false,
		                autoplay: $autoplay,
		                autoplaySpeed: $pause,
		                speed: $speed,
		                infinite: $infinite,
		                dots: $dots,
		                dotsClass:'lp-certificate-8-slider__dots',
		                appendDots:$('.lp-certificate-8__dots-block'),
		                responsive: [{
		                    breakpoint: 960,
		                    settings: {
		                        centerMode: true,
		                        slidesToShow: 3
		                    }
		                }]
		            });
		        } else {
		            $sliderArrows.hide();
		            $imageSlider.css('display', 'flex');
		        }
		        
		        
		        $(window).on('resize', function(){
		        	setTimeout(function(){
		        		var $dotItem = $this.find('.lp-certificate-8-slider__dots li button');
		        		if ($dotItem.hasClass('lp-certificate-8-slider__dot')) {
		        			
		        		}
		        		else {
					        $dotItem.attr('data-elem-type', 'card_container');
					        $dotItem.addClass('lp-certificate-8-slider__dot');
					        $dotItem.attr('data-lp-selector','.lp-certificate-8-slider__dot');
		        		}
		        	},100);
		        });
		
		        $textSlider.slick({
		            slidesToShow: 1,
		            slidesToScroll: 1,
		            fade: true,
		            autoplay: $autoplay,
	                autoplaySpeed: $pause,
	                speed: $speed,
	                infinite: $infinite,
		            arrows: false,
		            selector: '.js-text-slider-item',
		            mobileFirst: true,
		            asNavFor: $imageSlider,
		            accessibility: false
		        });
		        
		        $this.find('.js-lg-init').lightGallery({
					selector: '.lg-item',
					toogleThumb: false,
					getCaptionFromTitleOrAlt: false,
					download: false,
					thumbWidth: 64,
					thumbHeight: '64px',
					nextHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.98528 4.32805C9.3758 3.93753 10.009 3.93753 10.3995 4.32805L17.0563 10.9849C17.4469 11.3754 17.4469 12.0086 17.0563 12.3991L10.3995 19.056C10.009 19.4465 9.3758 19.4465 8.98528 19.056C8.59475 18.6654 8.59475 18.0323 8.98528 17.6418L14.935 11.692L8.98528 5.74226C8.59475 5.35174 8.59475 4.71857 8.98528 4.32805Z" fill="white"/></svg>',
					prevHtml: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.8492 5.03516L8.19239 11.692L14.8492 18.3489" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
				});
		    }
	    });
	}
	
	// Универсальная проверка на конструктор (редактор)
	function isInEditor() {
		try {
			return typeof s3LP !== 'undefined' && s3LP.is_cms === true;
		} catch (e) {
			return false;
		}
	}
	
	lp_template.queue.menuSimplePopup = function ($self) {
		var $block = $self.hasClass('js-menu-wrap') ? $self : $self.find('.js-menu-wrap');
	
		$block.each(function () {
			var $this = $(this),
				$topMenuWrap = $this.find('.js-menu__wrap'),
				$menu = $this.find('.js-menu_appedable'),
				$burger = $this.find('.js-burger'),
				$popup = $this.find('.js-popup'),
				$liHaschild = $this.find('.haschild');
	
			$this.append('<div class="lp-menu-block-bg"></div>');
	
			let popupHeight = $(window).height() - $this.height();
			let popupTop = $this.outerHeight();
			let bgTop = $this.height() + 50;
	
			if (isInEditor()) {
				popupTop += 72;
				bgTop += 72;
			}
	
			$this.find('.lp-menu-block-bg').animate({ top: bgTop }, 400);
			$popup.css('top', popupTop);
			$menu.clone().prependTo($topMenuWrap);
	
			function menuShow() {
				let ulWidth = 0;
				let ulWrapWidth = $topMenuWrap.width();
				let $visibleMenu = $topMenuWrap.find('.js-menu_appedable');
				let $menuText = $visibleMenu.data('row-text');
				const paramsGet = new URLSearchParams(window.location.search);
				
				if ($visibleMenu.hasClass('lp-menu-row')) { 
				    var $rowItemsBool = true;
					var $rowMenuUl = $visibleMenu;
					var $rowClassItemLi = $rowMenuUl.find('li').first().attr('class');;
					var $rowClassItem = $rowMenuUl.find('li').first().find('a').attr('class');	
				}	
	
				$visibleMenu.children('li').each(function () {
					ulWidth += $(this).outerWidth(true);
				});
	
				if (window.matchMedia('(min-width : 960px)').matches) {
					if($rowItemsBool) {
						$topMenuWrap.addClass('show');
						$burger.hide();
						if (!$rowMenuUl.find('.row-menu-btn').length) {
							$rowMenuUl.rowMenu({
								moreText: $menuText,
								moreWidth: 100
							});
						}						
						$rowMenuUl.find('.row-menu-btn').addClass($rowClassItemLi);
						$rowMenuUl.find('.row-menu-btn > a').addClass($rowClassItem);
						$rowMenuUl.find('.row-menu-btn > ul').addClass('lp-row-menu__popup');
						$visibleMenu.closest('.lp-row-menu__not-overflow').css('overflow', "initial");
					} else if (ulWidth <= ulWrapWidth) {
						$burger.hide();
						$topMenuWrap.addClass('show');
					} else {
						$topMenuWrap.removeClass('show');
						$burger.show();
					}
				} else {
					$topMenuWrap.removeClass('show');
					$burger.show();
				}
	
				let newPopupTop = $this.outerHeight();
				let newBgTop = $this.height();
	
				if (isInEditor()) {
					newPopupTop += 72;
					newBgTop += 72;
				}
	
				$popup.css('top', newPopupTop);
				$this.find('.lp-menu-block-bg').animate({ top: newBgTop }, 400);
			}
	
			function openMenu() {
				$popup.animate({ height: popupHeight }, 800).addClass('opened');
				$this.find('.lp-menu-block-bg').fadeIn(600);
				$this.css('z-index', '999');
				$('html').css('overflow', 'hidden');
			}
	
			function closeMenu() {
				$popup.animate({ height: "0%" }, 800).removeClass('opened');
				$this.find('.lp-menu-block-bg').fadeOut(600);
				$this.css('z-index', '');
				$('html').css('overflow', '');
				$burger.removeClass('opened');
			}
	
			$(window).on('resize', function () {
				setTimeout(menuShow, 500);
			}).trigger('resize');
	
			$burger.on('click', function () {
				$menu.find('li a').addClass('menu-popup-item-custom');
	
				if ($(this).hasClass('_in-side')) {
					$popup.animate({ top: 0 }, 400);
					$this.find('.lp-menu-block-bg').css('top', 0);
				} else {
					const scrollTopOffset = isInEditor() ? $this.offset().top - 72 : $this.offset().top;
					$('html, body').animate({ scrollTop: scrollTopOffset }, 100);
				}
	
				$popup.find('.js-popup__inner').css({
					overflow: 'auto',
					'max-height': '100%'
				});
	
				$burger.addClass('opened');
	
				if ($popup.hasClass('opened')) {
					closeMenu();
				} else {
					openMenu();
				}
			});
			
			$this.find('.haschild').on('click', function(e){
		    	e.stopPropagation();
		    	$(this).toggleClass('_open').children('ul').slideToggle();
		    });
	
			/*$liHaschild.on('click', function (e) {
				e.stopPropagation();
				const $thisItem = $(this);
				$thisItem.toggleClass('_open').children('ul').slideToggle();
	
				if ($thisItem.hasClass('lp-menu-22-burger__item')) {
					$thisItem.siblings('.lp-menu-22-burger__item._open')
						.removeClass('_open')
						.children('ul').slideUp();
				}
			});*/
	
			$popup.find('.js-menu_appedable').on('click', 'a', function () {
				closeMenu();
			});
	
			
			$(document).on('click', function (e) {
				const $popupInner = $popup.find('.js-popup__inner');
	
				if (isInEditor()) return;
	
				if (
					!$popupInner.is(e.target) &&
					$popupInner.has(e.target).length === 0 &&
					!$burger.is(e.target) &&
					$burger.has(e.target).length === 0
				) {
					closeMenu();
				}
			});
			
			$(document).on('keydown', function (e) {
				if ((e.key === 'Escape' || e.keyCode === 27) && $popup.hasClass('opened')) {
					closeMenu();
				}
			});
	
			
			if (isInEditor() && typeof LpController !== 'undefined') {
				setTimeout(function () {
					LpController.afterSave(function () {
						menuShow();
						setTimeout(function () {
							$(window).trigger('resize');
						}, 500);
					});
				}, 2000);
			}
		});
	};
	
	lp_template.queue.productsTabs10 = function($self) {
	    let $tabsBlock = $self.find('.js-prods10');
	
	    if ($tabsBlock.length) {
	        $tabsBlock.each(function(){
	
	            let $this = $(this),
	                $tabItem = $this.find('.js-tab-item'),
	                $tabContent = $this.find('.js-content'),
	                $firstTabItem = $tabItem.first(),
	                $firstTabContent = $tabContent.first(),
	
	            activeFirstTab = function(){
	                $firstTabItem.addClass('_active');
	                $firstTabContent.addClass('_active');
	            }
	
	            activeFirstTab();
	
	
	            $tabItem.on('click', function() {
	                $(this).addClass('_active').siblings().removeClass('_active');
	                $tabContent.removeClass('_active').eq($(this).index()).addClass('_active');
	            });
	        })
	    }
	}
	
	lp_template.queue.setPropsForCircled = function($self) {
		var $block = $self.find('.circled_container');
		
		var resizedFunction = function() {
			$block.each(function(){
				var $this = $(this);
	            
				$this.css({
					'width' : '',
					'height' : ''
				});
				
				var $thisHeight = $this.height(),
		            $thisWidth = $this.width(),
		            maxValue = $thisHeight > $thisWidth ? $thisHeight : $thisWidth;
				
				setTimeout(function(){
					$this.css({
						'width' : maxValue,
						'height' : maxValue
					});
				},1000);
		    });
		}
		
		$(window).on('resize', resizedFunction);
		if (s3LP.is_cms && typeof LpController !== 'undefined') {
			setTimeout(function(){
				LpController.afterSave(function () {
				    resizedFunction();
				});
			},1000);
		}
	}
	
	lp_template.queue.equalHeight = function($self) {
		var $block = $self.find('.equal-height');
		
		var resizedFunction = function() {
			$block.each(function(){
				var $this = $(this);
	            
				$this.css({
					'height' : ''
				});
				
				var $thisWidth = $this.width(),
		            maxValue = $thisWidth;
				
				setTimeout(function(){
					$this.css({
						'height' : maxValue
					});
				},1000);
		    });
		}
		
		$(window).on('resize', resizedFunction);
		if (s3LP.is_cms && typeof LpController !== 'undefined') {
			setTimeout(function(){
				LpController.afterSave(function () {
				    resizedFunction();
				});
			},1000);
		}
	}
	
	lp_template.queue.steps17 = function($self) {
		var $block = $self.hasClass('lp-steps-17') ? $self : $self.find('.lp-steps-17');
		$block.each(function(){
			if ($(this).length) {
				$(this).find('.js-counter-btn').on('click', function(){
				    var $this = $(this),
				        $thisIndex = $this.index(),
				        $item = $this.parents('.lp-steps-17').find('.js-slider-item').eq($thisIndex);
				    if (!$this.hasClass('_active')) $this.addClass('_active').siblings().removeClass('_active');
				    if (!$item.hasClass('_active')) $($item).fadeIn().addClass('_active').css('display', 'flex').siblings().hide().removeClass('_active');
				});
			}
		});
	}
	
	lp_template.queue.qa13 = function($self) {
	 	var $block = $self.hasClass('lp-qa-13') ? $self : $self.find('.lp-qa-13');
		if ($block.length)	{
			$block.each(function(){
				var $this = $(this);
				try {
					let colWrapper = '<div class="lp-qa-13-items-col"></div>',
						windowWidth = $(window).width(),
						evenElems = $this.find('.lp-qa-13-item:nth-child(even)');
			
					
					$this.find('.lp-qa-13-item').each(function(index, element){
						$(this).css('order', index+1);
						evenElems.addClass('_even');
					});
					
					let splitInCols = function() {
						if (windowWidth >= 960) {
						/*	$this.find('.lp-qa-13-items > .lp-qa-13-item:odd').wrapAll(colWrapper);
							$this.find('.lp-qa-13-items > .lp-qa-13-item').wrapAll(colWrapper);*/
							
							$this.find('.lp-qa-13-item._even').prependTo($this.find('.lp-qa-13-items-col').last());
						}
					}
			
					let setItemHeight = function(windowWidth) {
						if (windowWidth >= 960) {
							$this.find('.lp-qa-13-items-col').first().children('.lp-qa-13-item').each(function(index, element){
									
								let firstColItem = $(this).children('.lp-qa-13-item-title-wrapper'),
									secColItem = $this.find('.lp-qa-13-items-col').last().children('.lp-qa-13-item').eq(index).children('.lp-qa-13-item-title-wrapper');
								if (firstColItem.height()<secColItem.height()) {
									firstColItem.css('min-height', secColItem.height());	
								} else {
									secColItem.css('min-height', firstColItem.height());
								}	
							});
						} else {
							$this.find('.lp-qa-13-item-title-wrapper').css('min-height', '');
						}
					}
					splitInCols();
					setItemHeight(windowWidth);
					$(window).resize(function(){
						let newWindowWidth = $(window).width();
						if (windowWidth>=960){
							if (newWindowWidth < 960) {
								windowWidth = newWindowWidth;
								//$this.find('.lp-qa-13-item').unwrap();
								$this.find('.lp-qa-13-items-col').last().find('.lp-qa-13-item._even').appendTo($this.find('.lp-qa-13-items-col').first());
							}
						} else if (windowWidth<960){
							if (newWindowWidth>=960) {
								windowWidth = newWindowWidth;
								splitInCols();
							}
						}
						setItemHeight(newWindowWidth);
					});
			
				} catch(e) {
					console.log(e);
				}
			});
		}
	}
	
	lp_template.queue.header11 = function($self) {
		var $block = $self.hasClass('has-one-line-menu') ? $self : $self.find('.has-one-line-menu');
		if ($block.length) {
			$block.each(function(){
				var $this = $(this),
					$menu = $this.find('.js-nav-menu'),
					$menuControls = !!$this.data('menu-controls') ? $this.data('menu-controls') : 'border, indents, shadow, background',
					$dots = $this.find('.js-nav-menu-dots'),
					$navMenu = $this.find('.js-menu-wrap .js-nav-menu'),
					$lastLi = $this.find('.js-hidden-nav-menu'),
					$burger = $this.find('.js-side-menu-open-btn'),
					$sideMenu = $this.find('.js-side-menu'),
					$burgerIconsColor = $menu.find('li > a').css("color");
					
				function oneLineMenu() {
					$navMenu.oneLineMenu({
					    minWidth  : 599,
					    lastClass : 'lp-header-hidden-nav js-hidden-nav-menu',
					    left: -25,
					    kebabHtml: '<div class="lp-header-dots js-nav-menu-dots" data-has-event="1" data-elem-type="container" data-lp-selector=".lp-header-dots"><div class="lp-header-dots-in" data-lp-selector=".circle" data-elem-type="container"><div class="circle"></div><div class="circle"></div><div class="circle"></div></div></div>'
					});
					
					$(window).on('resize', function(){
						$dots = $this.find('.js-nav-menu-dots'),
						$lastLi = $this.find('.js-hidden-nav-menu');
						$dots.on('click', function(){
						    $this.find('.js-hidden-nav-menu > ul').toggleClass('_open');
						});	
						
						$lastLi.find('a').on('click', function(){
						    $this.find('.js-hidden-nav-menu > ul').toggleClass('_open');
						});	
						
						$this.find('.js-hidden-nav-menu > ul').attr('data-elem-type', 'generate').attr('data-lp-controls-list', $menuControls).addClass('lp-menu-19-inner').attr('data-lp-selector', '.lp-menu-19-inner');
						$this.find('.lp-block-bg').clone().prependTo($this.find('.js-hidden-nav-menu > ul'));
					}).trigger('resize');
					
					$burger.on('click', function(){
						$sideMenu.toggleClass('_open');
						$this.find('._overlay').toggleClass('_open');
						$this.toggleClass('_opened');
						$burger.toggleClass('is-active');
						$('body').toggleClass('overflow');
					});
					
					$sideMenu.on('click', 'a', function(){
				    	$sideMenu.toggleClass('_open');
						$this.find('._overlay').toggleClass('_open');
						$this.toggleClass('_opened');
						$burger.toggleClass('is-active');
						$('body').toggleClass('overflow');
				    });	
				    
				    $burger.find('.burger-inner, .hamburger-inner').css('background', $burgerIconsColor);
				}
				
				oneLineMenu();
				
				if (s3LP.is_cms && typeof LpController !== 'undefined') {
					setTimeout(function(){
						LpController.afterSave(function () {
							$navMenu.destroy();
						    oneLineMenu();
						});
					},1000);
				}
				
				if ($block.hasClass('lp-header-14')) {
					if ($block.find('.lp-header-14-nav li').length == 0) {
						$block.find('.lp-header-14-side-menu-button').hide();
					}
				}
			});
		}
	}
	
	lp_template.queue.steps14 = function($self) {
		
		var $block = $self.hasClass('lp-steps-14') ? $self : $self.find('.lp-steps-14');
		
		if ($block.length) {
			$block.each(function(){
				var $this = $(this);
				try {
		            var wrapRows = function wrapRows() {
		                var itemsCount = $this.find('.lp-steps-14-content>.lp-steps-14-item').length
		                  , sliceFunc = function sliceFunc(itemsInRow) {
		                    for (var i = 0; i < itemsCount / itemsInRow; i++) {
		                        $this.find('.lp-steps-14-content>.lp-steps-14-item').slice(0, itemsInRow).wrapAll(wrapper);
		                    }
		                };
		
		                if (windowWidth < 600) {} else if (windowWidth < 960) {
		                    sliceFunc(2);
		                } else if (windowWidth < 1200) {
		                    sliceFunc(3);
		                } else {
		                    sliceFunc(itemsInRow);
		                }
		            };
		
		            var windowWidth = $(window).width()
		              , wrapper = '<div class="lp-steps-14-row"></div>'
		              , itemsInRow = $this.find('.lp-steps-14-content').attr('data-count');
		            wrapRows();
		            $(window).resize(function() {
		                var newWindowWidth = $(window).width();
		
		                if (windowWidth < 960 && windowWidth >= 600) {
		                    if (newWindowWidth >= 960 || newWindowWidth < 600) {
		                        windowWidth = newWindowWidth;
		                        $this.find('.lp-steps-14-row>.lp-steps-14-item').unwrap();
		                        wrapRows();
		                    }
		                } else if (windowWidth < 1200 && windowWidth >= 960) {
		                    if (newWindowWidth >= 1200 || newWindowWidth < 960) {
		                        windowWidth = newWindowWidth;
		                        $this.find('.lp-steps-14-row>.lp-steps-14-item').unwrap();
		                        wrapRows();
		                    }
		                } else if (windowWidth >= 1200) {
		                    if (newWindowWidth < 1200) {
		                        windowWidth = newWindowWidth;
		                        $this.find('.lp-steps-14-row>.lp-steps-14-item').unwrap();
		                        wrapRows();
		                    }
		                } else if (windowWidth < 600) {
		                    if (newWindowWidth >= 600) {
		                        windowWidth = newWindowWidth;
		                        $this.find('.lp-steps-14-row>.lp-steps-14-item').unwrap();
		                        wrapRows();
		                    }
		                }
		                
		                
			                if (window.matchMedia('(min-width : 600px)').matches) {
				                var $circle = $this.find('.lp-steps-14-item__counter'),
				                	$circleHeight = $circle.outerHeight() / 2,
				                	$lastItem = $this.find('.lp-steps-14-item:not(:last-child)'),
				        			$arrow = $lastItem.find('.lp-steps-14-item__arrow');
				        			
				        		$('.lp-steps-14-item__arrow').css('top', '');
		        				$arrow.css('top', $circleHeight);
			                }
			                
			                else {
			                	$('.lp-steps-14-item__arrow').css('top', '');
			                }
		                
		                
		                
		            });
		        } catch (e) {
		            console.log(e);
		        }
			});
		}
	}
	
	lp_template.queue.features28 = function($self) {
		var $block = $self.hasClass('lp-features-28') ? $self : $self.find('.lp-features-28');

		if ($block.length) {

			$block.each(function() {
				var $this = $(this),
					pie28 = '';
				
				function donutInit() {
					var listData = new Array(),
						listColor = new Array(),
						$pie = '.lp-features-28-pie';
						
					$this.find('.lp-features-28-item').each(function(index, element){
						let itemValue = parseInt($(this).find('.lp-features-28-item__text').text()),
							itemText = $(this).find('.lp-features-28-item__text').text();
							
						listColor.push($(this).find('.lp-features-28-item__color').css('background-color')),
						listData.push([itemText, itemValue]);
					});
			
					pie28 = $.jqplot($pie, [listData], {
						seriesDefaults: {
							renderer:$.jqplot.DonutRenderer,
							rendererOptions:{
								padding: 0,
								shadowOffset: 0,
								sliceMargin: 0,
								startAngle: 180,
								showDataLabels: true,
								dataLabels: 'label',
								totalLabel: false,
								seriesColors: listColor,
								borderWidth: 0.0
							}
						},
						grid: {
							borderWidth: 0.0,
							shadow: false,
							background: '#ffffff',
							backgroundColor: 'rgba(255, 255, 255, 0)'
							
						}
					});
		
					$this.find('.lp-features-28-pie .jqplot-data-label').addClass('lp-header-title-6 lp-features-28-item__text').attr('data-elem-type', 'text');
					$this.find('.lp-features-28-pie .jqplot-data-label').attr('data-lp-selecttor', '.lp-features-28-item__text');
				}
				
				donutInit();
				
				if (s3LP.is_cms && typeof LpController !== 'undefined') {
					setTimeout(function(){
						LpController.afterSave(function () {
						    
							pie28.destroy();
							setTimeout(function(){
								donutInit();
							},1000);
							
						});
					},1000);
				}
				
				$(window).resize(function(){
					if (window.matchMedia('(max-width : 600px)').matches) {
				    	pie28.destroy();
						donutInit();
				    }
				    else {
				    	pie28.destroy();
						donutInit();
				    }
				});
				
			});
		}		
	};
	
	lp_template.queue.features31 = function($self) {
		var $block = $self.hasClass('lp-features-31') ? $self : $self.find('.lp-features-31');

		if ($block.length) {

			$block.each(function() {
				var $this = $(this);
					
				$this.find('.lp-features-31-item').each(function(index, element){
					var listData = new Array(),
						listColor = new Array(),
						$pie = '#' + $this.find('.lp-features-31-pie').eq(index).attr('id'),
						$innerDiameter = 250;
					
					let itemValue = parseInt($(this).find('.lp-features-31-item__title').attr('data-value')),
						itemValueHidden = parseInt($(this).find('.lp-features-31-item__title._hidden').attr('data-value')),
						itemText = $(this).find('.lp-features-31-item__text').text(),
						itemTextHidden = $(this).find('.lp-features-31-item__title._hidden + .lp-features-31-item__text').text();
						listColor.push($(this).find('.lp-features-31-item__color._active-color').css('background-color'));
						listColor.push($(this).find('.lp-features-31-item__color._disabled-color').css('background-color'));
						listData.push([itemTextHidden, itemValueHidden]);
						listData.push([itemText, itemValue]);
					
					$(window).on('resize', function(){
						
						if (window.matchMedia('(min-width : 1380px)').matches) {
							$innerDiameter = 222;
						} else if (window.matchMedia('(min-width : 1200px)').matches) {
							$innerDiameter = 224;
						} else if (window.matchMedia('(min-width : 960px)').matches) {
							$innerDiameter = 228;
						} else if (window.matchMedia('(min-width : 600px)').matches) {
							$innerDiameter = 241;
						}
						
						if(!$('.lp-features-31-pie').eq(index).is(':empty')) {
							$('.lp-features-31-pie').html('');
						}
						
						var pie31 = $.jqplot($pie, [listData], {
							seriesDefaults: {
								renderer:$.jqplot.DonutRenderer,
								rendererOptions:{
									padding: 0,
									shadowOffset: 0,
									innerDiameter: $innerDiameter,
									sliceMargin: 0,
									startAngle: -90,
									showDataLabels: true,
									dataLabels: 'label',
									totalLabel: false,
									seriesColors: listColor,
									borderWidth: 0.0
								}
							},
							grid: {
								borderWidth: 0.0,
								shadow: false,
								background: 'rgba(255, 255, 255, 0)'
							}
						});
						
						$this.find('.lp-features-31-pie .jqplot-data-label').addClass('lp-header-title-1 lp-features-31-item__text').attr('data-elem-type','text').attr('data-lp-selector','.lp-features-31-item__text');
					}).trigger('resize');
					
				});
		
			});
		}		
	};
	

	lp_template.queue.sertificate5 = function($self) {
		var $block = $self.hasClass('lp-certificate-5') ? $self : $self.find('.lp-certificate-5');

		if ($block.length) {

			$block.each(function() {
				var $this = $(this);
			    	
			    function isotopeinit () {	
				    var	$mansoryItem = $this.find('.js-main-item'),
				    	$isotope = $this.find('.js-isotope');
					
					setTimeout(function(){
					    $isotope.isotope({
					        itemSelector: '.js-isotope-item',
					        originLeft: true
					    });
					}, 0.100);
			    }
			    isotopeinit();
			
				if (s3LP.is_cms && typeof LpController !== 'undefined') {
					setTimeout(function(){
						LpController.afterSave(function () {
						    isotopeinit();
						});
					},1000);
				}
			});
		}		
	};
	
	
	lp_template.queue.sertificate9 = function($self) {
		var $block = $self.hasClass('lp-certificate-9') ? $self : $self.find('.lp-certificate-9');

		if ($block.length) {

			$block.each(function() {
				var $this = $(this);
			    	
			    
			    if ($this.find('.lp-certificate-9-item').hasClass('_not_con')) {
			    	$this.find('.lp-certificate-9-arrow').hide();
			    }
			});
		}		
	};
	
	lp_template.queue.Init221303 = function ($self) {
					
	    var $gallery = $self.find('.lp-gallery-2');
	
	    if ($gallery.length) {
	        $gallery.each(function(){
	            var $thisBlock = $(this);
	            var $window = $(window);
	            var $maskPhoto = $(this).find('.js-photo-mask');
	            var $mainPhoto = $(this).find('.js-main-item');
	            var $previewPhoto = $(this).find('.js-preview-item');
	            var $touchStartX = 0;
	            var $touchEndX = 0;
	            var $nextPhotoBtn = $(this).find('.js-next-item');
	            var $prevPhotoBtn = $(this).find('.js-prev-item');
	            var $showMoreBtn = $(this).find('.js-show-more');
	            var $lightGallery = $(this).find('.js-light-gallery');
	
	
	            $mainPhoto.on('touchstart', function() {
	                // event.preventDefault();
	                // event.stopPropagation();
	                $touchStartX = event.targetTouches[0].screenX;
	            });
	
	            $mainPhoto.on('touchend', function() {
	                // event.preventDefault();
	                // event.stopPropagation();
	                $touchEndX = event.changedTouches[0].screenX;
	                handleGesture();
	            });
	
	            function showNextPhoto() {
	                if ($mainPhoto.length <= 7) {
	                    if ( !$mainPhoto.last().hasClass('_active')) {
	                        $mainPhoto.siblings('._active').next().addClass('_active');
	                        $previewPhoto.siblings('._active').next().addClass('_active');
	                        $mainPhoto.siblings('._active').first().removeClass('_active');
	                        $previewPhoto.siblings('._active').first().removeClass('_active');
	                    } else {
	                        $mainPhoto.siblings().removeClass('_active');
	                        $previewPhoto.siblings().removeClass('_active');
	                        $mainPhoto.first().addClass('_active');
	                        $previewPhoto.first().addClass('_active');
	                    }
	                } else {
	                    if ( !$mainPhoto.eq(5).hasClass('_active')) {
	                        $mainPhoto.siblings('._active').next().addClass('_active');
	                        $previewPhoto.siblings('._active').next().addClass('_active');
	                        $mainPhoto.siblings('._active').first().removeClass('_active');
	                        $previewPhoto.siblings('._active').first().removeClass('_active');
	                    } else {
	                        $mainPhoto.siblings().removeClass('_active');
	                        $previewPhoto.siblings().removeClass('_active');
	                        $mainPhoto.first().addClass('_active');
	                        $previewPhoto.first().addClass('_active');
	                    }
	                }
	                
	                $thisBlock.find('.lp-gallery-2-photo__preview-item-mask._active').removeClass('_active').attr('data-lp-selector', '.lp-gallery-2-photo__preview-item-mask');
	                $thisBlock.find('.lp-gallery-2-photo__preview-item._active .lp-gallery-2-photo__preview-item-mask').addClass('_active').attr('data-lp-selector', '.lp-gallery-2-photo__preview-item-mask._active');
	            }
	
	            function showPrevPhoto() {
	
	                if ($mainPhoto.length <= 7) {
	                    if ( !$mainPhoto.first().hasClass('_active')) {
	                        $mainPhoto.siblings('._active').prev().addClass('_active');
	                        $previewPhoto.siblings('._active').prev().addClass('_active');
	                        $mainPhoto.siblings('._active').last().removeClass('_active');
	                        $previewPhoto.siblings('._active').last().removeClass('_active');
	                    } else {
	                        $mainPhoto.siblings().removeClass('_active');
	                        $previewPhoto.siblings().removeClass('_active');
	                        $mainPhoto.last().addClass('_active');
	                        $previewPhoto.last().addClass('_active');
	                    }
	                } else {
	                    if ( !$mainPhoto.first().hasClass('_active')) {
	                        $mainPhoto.siblings('._active').prev().addClass('_active');
	                        $previewPhoto.siblings('._active').prev().addClass('_active');
	                        $mainPhoto.siblings('._active').last().removeClass('_active');
	                        $previewPhoto.siblings('._active').last().removeClass('_active');
	                    } else {
	                        $mainPhoto.siblings().removeClass('_active');
	                        $previewPhoto.siblings().removeClass('_active');
	                        $mainPhoto.eq(5).addClass('_active');
	                        $previewPhoto.eq(5).addClass('_active');
	                    }
	                }
	
					$thisBlock.find('.lp-gallery-2-photo__preview-item-mask._active').removeClass('_active').attr('data-lp-selector', '.lp-gallery-2-photo__preview-item-mask');
	                $thisBlock.find('.lp-gallery-2-photo__preview-item._active .lp-gallery-2-photo__preview-item-mask').addClass('_active').attr('data-lp-selector', '.lp-gallery-2-photo__preview-item-mask._active');
	            }
	
	
	
	            function handleGesture() {
	                var $touchPath = $touchStartX - $touchEndX;
	                if (Math.abs($touchPath) > 50) {
	                    if ($touchPath > 0) {
	                        //Next
	                        showNextPhoto();
	                    } else {
	                        //Prev
	                        showPrevPhoto();
	                    }
	                }
	            }
	
	            var setPhotoMaskSize = function() {
	                $maskPhoto.height($maskPhoto.width());
	            }
	
	
	            var showFirstPhoto = function() {
	                $mainPhoto.first().addClass('_active');
	                $previewPhoto.first().addClass('_active');
	                $previewPhoto.first().find('.lp-gallery-2-photo__preview-item-mask').addClass('_active').attr('data-lp-selector', '.lp-gallery-2-photo__preview-item-mask._active');
	            }
	
	            showFirstPhoto();
	
	            if ($(window).width() < 600) {
	                setPhotoMaskSize();
	            }
	
	            $window.resize(function() {
	                if ($(window).width() < 600) {
	                    setPhotoMaskSize();
	                }
	            })
	
	            $nextPhotoBtn.on ('click', function (e) {
	            	e.preventDefault();
	                showNextPhoto();
	            })
	
	            $prevPhotoBtn.on('click', function (e) {
	            	e.preventDefault();
	                showPrevPhoto();
	            })
	
	            $previewPhoto.on('click', function() {
	                var $this = $(this);
	                if (!$this.hasClass('_active')) {
	                    $this.addClass('_active');
	                    $this.find('.lp-gallery-2-photo__preview-item-mask').addClass('_active').attr('data-lp-selector', '.lp-gallery-2-photo__preview-item-mask._active');
	                    $this.siblings().removeClass('_active');
	                    $this.siblings().find('.lp-gallery-2-photo__preview-item-mask').removeClass('_active').attr('data-lp-selector', '.lp-gallery-2-photo__preview-item-mask');
	                }
	                $mainPhoto.eq($this.index()).addClass('_active').siblings().removeClass('_active');
	            })
	
	            $lightGallery.lightGallery({
	                thumbnail: true,
	                hideControlOnEnd: true,
	                slideEndAnimatoin: false,
	                loop: true,
	                download: false,
	                thumbWidth: 64,
	                thumbContHeight: 96,
	                toogleThumb: false,
	                thumbMargin: 8,
	                selector: '.js-main-item'
	            })
	
	            $showMoreBtn.on('click', function() {
	                $mainPhoto.eq(6).trigger('click')
	            })
	        })
	    }
	}
	
	lp_template.queue.lpGallery20 = function ($self) {
					
	    var $block = $self.hasClass('lp-gallery-20') ? $self : $self.find('.lp-gallery-20');
		
	    if ($block.length) {
	        $block.each(function(){
			    var $this = $(this),
			    	$photos = $this.find('.js-photos');
			    
			    function placePhotoToMosaic() {
			        $photos.children('.js-photo').each(function(index) {
			            if (window.outerWidth < 960) {
			                if (index % 3 == 0) { // wrap by 2 items
			                
			                    $(this).add($(this).next('.js-photo')).add(
			                        $(this).next().next('.js-photo')
			                    ).wrapAll('<div class="lp-gallery-20-photo__item-wrap 1" />');
			                }
			            } else {
			            	
			                if (index % 5 == 0) { // wrap by 2 items
			                	
			                    $(this).add(
			                        $(this).next('.js-photo')).add(
			                            $(this).next().next('.js-photo').add(
			                                $(this).next().next().next('.js-photo').add(
			                                    $(this).next().next().next().next('.js-photo')
			                                )
			                            )
			                        ).wrapAll('<div class="lp-gallery-20-photo__item-wrap " />');
			                }
			                
			                // костыль для ЛП в СУ, чтобы не ставил две обертки
			            	if ($photos.find('.js-photo').parent().hasClass('lp-gallery-20-photo__item-wrap')) {
			            		return;
			            	}
			            }
			        });
			
			        $photos.find('.lp-gallery-20-photo__item-wrap').each(function(el) {
			            $(this).addClass('_' + $(this).children().length + '-item')
			        });
			    }
			
				$(window).on('resize', function(){
					if ($photos.find('.js-photo').parent().hasClass('lp-gallery-20-photo__item-wrap')) {
		        		$photos.find('.js-photo').unwrap();
		        	}
		        	
	        		setTimeout(function(){
		    			placePhotoToMosaic();
	        		},0);
				});
	        })
	    }
	}
	
	lp_template.queue.lpGallery22 = function($self) {
		var $block = $self.hasClass('lp-gallery-22') ? $self : $self.find('.lp-gallery-22');

		if ($block.length) {
			$block.each(function(){
				var $this = $(this),
					$slider = $this.find('.js-owl-carousel'),
					autoplay = !!$slider.data('autoplay'),
					loop = !!$slider.data('infinite'),
					nav = !!$slider.data('arrows'),
					dotsEach = !!$slider.data('dots-each'),
					dots = 1,
					pause = $slider.data('pause') || 5000,
					$rewind = 0,
					speed = $slider.data('speed') || 250,
					fade = !!$slider.data('fade'),
					$parent = $slider.closest('[data-block-layout]'),
					dataResponse = $slider.data('response'),
					response = {},
					$dots = $parent.find('.lp-dots-wrapper'),
					$window = $(window),
			        $itemsInRow;
			        
			        if(s3LP.is_cms){
	                	var infinite = false,
	                	$rewind = 1,
	              		autoplay = false;
	                }
	              	else if(typeof ReactLPConstructor == 'object') {
	              		var infinite = false,
	              		$rewind = 1,
	              		autoplay = false;
	              		
	              	}
			
			
			    $slider.find('.js-photo-item').each(function(index) {
			        if (index % 2 == 0) { // wrap by 2 items
			            $(this).add($(this).next('.js-photo-item')).wrapAll('<div class="lp-gallery-22-gallery-item-wrap js-owl-carousel-item" />');
			        }
			    });
			
			    var $sliderItem = $this.find('.js-owl-carousel-item');
			
			    if ($this.hasClass('_6')) {
			        $itemsInRow = 6;
			    } else if ($this.hasClass('_8')) {
			        $itemsInRow = 8;
			    } else if ($this.hasClass('_12')) {
			
			        if ($window.width() < 960) {
			          $itemsInRow = 8
			        } else {
			            $itemsInRow = 12;
			        }
			    } else {
			        $itemsInRow = 4;
			    }
			
			    if ($sliderItem.length > $itemsInRow) {
			        $slider.owlCarousel({
						autoplay : autoplay,
						loop : loop,
						nav : nav,
						dots : true,
						dotsEach: dotsEach,
						rewind: $rewind,
						animateIn: fade ? 'fadeIn' : false,
						animateOut: fade ? 'fadeOut' : false,
						smartSpeed: speed,
						mouseDrag: s3LP.is_cms ? false : true, 
						autoplayTimeout: pause,
			            responsive: {
			                0: {
			                    items: 2,
			                    slideBy: 2
			                },
			                600: {
			                    items: $itemsInRow,
			                    slideBy: 1
			                }
			            },
						onInitialized: function(e) {
							var $dotsCount = $parent.find('.owl-dot').length;
							
							if (!$dots.length || $dotsCount < 2) {
								$dots.html('');
								
								$parent.find('.js-next-slide, .js-prev-slide').addClass('_hide');
								return;
							};
							var $dotsHTML = '';
							
							for(var i = 0; i < $dotsCount; i++) {
								$dotsHTML += '<div class="lp-dots-item js-dot-item" data-elem-type="container" data-lp-selector=".lp-dots-item"></div>';
							} 
							
							if (!$dots.hasClass('_unchanged')) {
							
								$dots.html($dotsHTML);
							
							}
							
							$dots.find('.lp-dots-item').eq(0).addClass('active');
							
						},
						
						onResized: function(e) {
							if (!$dots.length || e.page.count < 2) {
								$dots.html('');
								$parent.find('.js-next-slide, .js-prev-slide').addClass('_hide');
								return;
							} else {
								$parent.find('.js-next-slide, .js-prev-slide').addClass('_show');
							}
							
							var $dotsHTML = '';
							for(var i = 0; i < e.page.count; i++) {
								$dotsHTML += '<div class="lp-dots-item js-dot-item" data-elem-type="container" data-lp-selector=".lp-dots-item"></div>';
							}
							
							if (!$dots.hasClass('_unchanged')) {
								$dots.html($dotsHTML);
							}
							$dots.find('.lp-dots-item').removeClass('active');
							$dots.find('.lp-dots-item').eq(e.page.index).addClass('active');
						},
						onTranslate: function(e) {
							$dots.find('.lp-dots-item').removeClass('active');
							$dots.find('.lp-dots-item').eq(e.page.index).addClass('active');
						}
			        });
			        
			        $parent.on('click', '.js-next-slide', function(e) {
						e.preventDefault();
						$slider.trigger('next.owl.carousel');
					});
	
					$parent.on('click', '.js-prev-slide', function(e) {
						e.preventDefault();
						$slider.trigger('prev.owl.carousel');
					});
	
					$parent.on('click', '.js-dot-item', function(e) {
						e.preventDefault();
						$slider.trigger('to.owl.carousel', [$(this).index()]);
					});
			    }
			});
		}
	}
	
	lp_template.queue.lpPromo13 = function($self) {
	    var $slider = $self.find('.js-promo-13-slider');
	
	    if ($slider.length) {
	        $slider.each(function(){
	
	            var $this = $(this),
	                $parent = $this.closest('[data-block-layout]'),
	                $currentSlideBlock = $parent.find('.js-promo-13-current'),
	                $totalSlidesBlock = $parent.find('.js-promo-13-total'),
					$autoplay = $this.data('autoplay'),
					$infinite = $this.data('infinite'),
					$autoplaySpeed = $this.data('autoplay-speed'),
					$speed = $this.data('speed');
					
					if(s3LP.is_cms){
	                	var $infinite = false,
	              		$autoplay = false;
	                }
	              	else if(typeof ReactLPConstructor == 'object') {
	              		var $infinite = false,
	              		$autoplay = false;
	              	}
	
	
	            function changeProgressWidth($progressWidth) {
	                var $progressWidthBlock =  $parent.find('.js-promo-13-progress'),
	                	outerWidth = $progressWidthBlock.outerWidth(),
	                	innerWidth = $progressWidthBlock.innerWidth(),
	                	$progressMaxWidthBlock = outerWidth - innerWidth;
	                	
	                $progressWidthBlock.css('width', 'calc(' + $progressWidth + '%' + ' - ' + $progressMaxWidthBlock + 'px');
	            }
	
	            $this.on('init reInit', function(event, slick) {
	                var $totalSlides = slick.slideCount;
	
	                if($totalSlides > 1) {
	                    var $progressWidth = 1 /$totalSlides*100;
	                    $totalSlidesBlock.text($totalSlides);
	                    changeProgressWidth($progressWidth);
	                } else {
	                    $parent.find('.js-promo-13-progress-block').css('display', 'none')
	                }
	
	
	            });
	
	            $this.slick({
	                infinite: $infinite,
	                speed: $speed,
	                autoplay: $autoplay,
				    autoplaySpeed: $autoplaySpeed,
	                slidesToShow: 1,
	                slidesToScroll: 1,
	                fade: true,
	                dots:false,
	                prevArrow: $parent.find('.lp-promo-13-slider__arrow--left'),
	                nextArrow: $parent.find('.lp-promo-13-slider__arrow--right')
	            });
	
	            $this.on('afterChange', function(event, slick, currentSlide){
	                var $currentSlide = currentSlide + 1,
	                    $totalSlides = slick.slideCount,
	                    $progressWidth = $currentSlide/$totalSlides*100;
	                $currentSlideBlock.text($currentSlide);
	                changeProgressWidth($progressWidth);
	            });
	
	        });
	    }
	}
	
	lp_template.queue.lpPromo16 = function($self) {
	    var $slider = $self.find('.js-promo-16-slider');

	    if ($slider.length) {
	        $slider.each(function(){
	
	            var $this = $(this),
	                $parent = $this.closest('[data-block-layout]'),
	                $currentSlideBlock = $parent.find('.js-promo-16-current'),
	                $totalSlidesBlock = $parent.find('.js-promo-16-total'),
					$autoplay = $this.data('autoplay'),
					$infinite = $this.data('infinite'),
					$autoplaySpeed = $this.data('autoplay-speed'),
					$speed = $this.data('speed');
					
					if(s3LP.is_cms){
	                	var $infinite = false,
	              		$autoplay = false;
	                }
	              	else if(typeof ReactLPConstructor == 'object') {
	              		var $infinite = false,
	              		$autoplay = false;
	              	}
	
	            $this.on('init reInit afterChange', function(event, slick) {
	                var $totalSlides = slick.slideCount;
	
	                if($totalSlides > 1) {
	                    $totalSlidesBlock.text($totalSlides);
	                } else {
	                    $('.js-promo-16-progress-block').css('display', 'none')
	                }
	            });
	
	            $this.on('afterChange', function(event, slick, currentSlide){
	                var $currentSlide = currentSlide + 1;
	                $currentSlideBlock.text($currentSlide);
	            });
	
	            $this.slick({
	                infinite: $infinite,
	                speed: $speed,
	                autoplay: $autoplay,
				    autoplaySpeed: $autoplaySpeed,
	                slidesToShow: 1,
	                slidesToScroll: 1,
	                fade: true,
	                dots:false,
	                prevArrow: $parent.find('.lp-promo-16-slide__arrow--left'),
	                nextArrow: $parent.find('.lp-promo-16-slide__arrow--right')
	            });
	        });
	    }
	}
	
	lp_template.queue.lpProducts39 = function($self) {
		var $block = $self.hasClass('lp-prods-39') ? $self : $self.find('.lp-prods-39');
			
		if ($block.length) {
			var func = function() {
				$block.each(function(){
					var $this = $(this);
					if (window.matchMedia('(min-width: 1200px)').matches) {
						$this.find('.lp-prods-39__subblock').each(function(index) {
							var item = $(this).find('.lp-prods-39__item:first-child()'),				
									itemHeight = item.height() + 2*parseInt(item.css('border-width'));					
			
							$(this).find('.lp-prods-39__title-wrap').css('min-height', itemHeight);
			
						});
					} else {
						$this.find('.lp-prods-39__title-wrap').css('min-height', '');
					}
				});
			};
			
			$(window).on('resize', func);
			if (s3LP.is_cms && typeof LpController !== 'undefined') {
				setTimeout(function(){
					LpController.afterSave(function () {
					    func();
					});
				},1000);
			}
		}
	}
	
	lp_template.queue.lpContacts6 = function($self) {
		var $contactsBlock = $self.hasClass('js-contacts-6') ? $self : $self.find('.js-contacts-6');
		
		setTimeout(function() {
			$('.lp-contacts-6-data-column').removeClass('lp-contacts-6-data-column-load');	
		}, 1000);
			
		if ($contactsBlock.length) {
		    $contactsBlock.each(function() {
		
		        var $tab = $contactsBlock.find('.js-tab'),
		            $tabsBlock = $contactsBlock.find('.js-tabs'),
		            $contactsData = $contactsBlock.find('.js-contacts-data');
		
		        // Одинаковая высота у всех блоков
		
		        function setHeight() {
		            var maxHeight = $contactsData.eq(0).height();
		            $contactsData.each(function () {
		                if ( $(this).height() > maxHeight ) {
		                    maxHeight = $(this).height();
		                }
		            });
		            $contactsData.css('minHeight', maxHeight);
		
		            setTimeout(function(){
		                $contactsData.hide();
		                $contactsData.eq(0).addClass('_active');
		            }, 500);
		        }
		
		        // Табы
		
		        function tabsInit() {
		            $tab.on('click', function() {
		                $(this).addClass('_active').siblings().removeClass('_active');
		                $contactsData.removeClass('_active').eq($(this).index()).addClass('_active');
		                lp_template.checkMapInitialization($contactsData.eq($(this).index()).find('.js-lp-simple-map'));
		                if ($contactsBlock.find('.lp-contacts-6-map').data('map-type') == 'yandex') {
		                	$contactsData.eq($(this).index()).find('.js-lp-simple-map').data('ymaps').container.fitToViewport();
		                }
		            });
		        }
		
		        // Кастомный скролл
		
		        function scrollInit() {
		
		            // Показывать скролл, если он нужен
		            var widthSum = 0;
		            $tab.each(function () {
		                widthSum +=  +$(this).outerWidth(true)
		            })
		
		            if(widthSum > $tabsBlock.width()) {
		                baron({
		                    root: '.lp-contacts-6-scroll',
		                    scroller: '.lp-contacts-6-scroll__inner',
		                    bar: '.lp-contacts-6-scroll__bar',
		                    scrollingCls: '_scrolling',
		                    draggingCls: '_dragging',
		                    direction: 'h',
		
		                })
		            }
		        }
		
		        // Карты
		
		        setHeight();
		        tabsInit();
		        //scrollInit();
		
		    });
		}
	}
	
	lp_template.queue.lpReviews18 = function($self) {

	    var $block = $self.hasClass('lp-reviews-18') ? $self : $self.find('.lp-reviews-18');
	    if ($block.length) {
		    $block.each(function(){
			    var $this = $(this);
			    
					try {
						adjustHeight();
			
						$(window).on('resize', function(){				
							adjustHeight();
						});			  
					} catch(exception) {
						console.log(exception);
					}
			
				function adjustHeight() {
					if (window.matchMedia('(min-width: 960px)').matches) {
						var wrapTopPadding = parseInt($this.find('.lp-reviews-18__wrap').css('padding-top')),					
								headerHeight = $this.find('.lp-reviews-18__header').height(),				
								imgHeight = $this.find('.lp-reviews-18__bg-img').height(),
								top = wrapTopPadding + headerHeight,					
								contentMinHeight = imgHeight + headerHeight;								
						
						$this.find('.lp-reviews-18__bg-img').css({top: top});
						$this.find('.lp-reviews-18__content').css({minHeight:contentMinHeight});			
					} else {
						$this.find('.lp-reviews-18__bg-img').css({top: ''});
						$this.find('.lp-reviews-18__content').css({minHeight: ''});			
					}
				};
				
				if (s3LP.is_cms && typeof LpController !== 'undefined') {
					setTimeout(function(){
						LpController.afterSave(function () {
						    $(window).trigger('resize');
						});
					},3000);
				}
		    });
	    }
	}
	
	lp_template.queue.lpReviews19 = function($self) {

	    var $block = $self.hasClass('lp-reviews-19') ? $self : $self.find('.lp-reviews-19');
	    
	    $block.each(function(){
		    var $this = $(this);
		    
				try {
					setTimeout(function(){
						imgHeight();
					},3000);
					
					$(window).on('resize', function(){				
						setTimeout(function(){
							imgHeight();
						},300);
					});
					
					if (s3LP.is_cms && typeof LpController !== 'undefined') {
						setTimeout(function(){
							LpController.afterSave(function () {
							    imgHeight();
							});
						},3000);
					
					}
					
				} catch(exception) {
					console.log(exception);
				}
		
			function imgHeight() {
				if (window.matchMedia('(min-width: 960px)').matches) {
					var topHeight = $this.find('.lp-reviews-19__top').height();
					
					$this.find('.lp-reviews-19__block-img').css({height: topHeight});
								
				} else {
					$this.find('.lp-reviews-19__block-img').css({height: ''});
				}
			};
	    });
	}
	
	
	lp_template.queue.lpVideo17 = function($self) {
	    var $block = $self.hasClass('lp-video-17') ? $self : $self.find('.lp-video-17');

	    if ($block.length) {
	        $block.each(function(){
	        	var $this = $(this),
	        		$sliderBig = $this.find('.lp-video-17__slider-big'),
	        		slider_thumbs = $this.find('.lp-video-17__slider-thumbs'),
	        		$nav = !!slider_thumbs.data('arrows'),
					$dot = !!slider_thumbs.data('dots'),
					$autoplay = !!$sliderBig.data('autoplay'),
					$infinite = $sliderBig.data('infinite'),
					$autoplaySpeed = $sliderBig.data('pause'),
					$speed = $sliderBig.data('speed');
					
					if(s3LP.is_cms){
	                	var $infinite = false,
	              		$autoplay = false;
	                }
	              	else if(typeof ReactLPConstructor == 'object') {
	              		var $infinite = false,
	              		$autoplay = false;
	              	}

				try {

				    initSlick();
					
				} catch(exception) {
					console.log(exception);
				}

				function initSlick() {
					$this.find('.lp-video-17__slider-big').slick({
						infinite: $infinite,
		                speed: $speed,
						vertical: false,
						verticalSwiping: true,
						slidesPerRow: 1,
						slidesToShow: 1,
						slidesToScroll: 1,			
						asNavFor: $this.find('.lp-video-17__slider-thumbs'),
						arrows: false,
						fade: true,
						dots: false,
						adaptiveHeight: true,
						draggable: true,			
						responsive: [
							{
								breakpoint: 1200,
								settings: {
									vertical: false,
									fade: true,
									cssEase: 'ease',
									verticalSwiping: false,
								}
							},
							{
								breakpoint: 600,
								settings: {
									vertical: false,
									verticalSwiping: false,
									dots: true,
									arrows: true,
									appendArrows: $this.find('.lp-video-17__big-controls'),
									prevArrow: '<button data-has-event="1" data-elem-type="container" data-lp-selector=".lp-video-17__arrow" class="lp-video-17__arrow lp-video-17__arrow-prev js-prev-item _primary-fill _svg-light-fill"><div data-elem-type="container" class="arrow-line-wr" data-lp-selector=".arrow-line"><div class="arrow-line"></div><div class="arrow-line"></div></div></button>',
									nextArrow: '<button data-has-event="1" data-elem-type="container" data-lp-selector=".lp-video-17__arrow" class="lp-video-17__arrow lp-video-17__arrow-next js-next-item _primary-fill _svg-light-fill"><div data-elem-type="container" class="arrow-line-wr" data-lp-selector=".arrow-line"><div class="arrow-line"></div><div class="arrow-line"></div></div></button>',
									appendDots: $this.find('.lp-video-17__big-dots'),						
								}
							}
						]
					});
				
					$this.find(".lp-video-17__slider-thumbs").slick({
						infinite: $infinite,
		                speed: $speed,
		                autoplay: $autoplay,
					    autoplaySpeed: $autoplaySpeed,
						vertical: true,
						verticalSwiping: true,
						slidesPerRow: 1,
						slidesToShow: 4,	
						asNavFor: $this.find('.lp-video-17__slider-big'),
						focusOnSelect: true,
						arrows: true,
						dots: true,
						adaptiveHeight: true,
						appendArrows: $this.find('.lp-video-17__thumbs-controls'),			
						appendDots: $this.find('.lp-video-17__thumbs-dots'),
						prevArrow: '<button data-has-event="1" data-elem-type="container" data-lp-selector=".lp-video-17__arrow" class="lp-video-17__arrow lp-video-17__arrow-prev js-prev-item _primary-fill _svg-light-fill"><div data-elem-type="container" class="arrow-line-wr" data-lp-selector=".arrow-line"><div class="arrow-line"></div><div class="arrow-line"></div></div></button>',
						nextArrow: '<button data-has-event="1" data-elem-type="container" data-lp-selector=".lp-video-17__arrow" class="lp-video-17__arrow lp-video-17__arrow-next js-next-item _primary-fill _svg-light-fill"><div data-elem-type="container" class="arrow-line-wr" data-lp-selector=".arrow-line"><div class="arrow-line"></div><div class="arrow-line"></div></div></button>',
						responsive: [
							{
								breakpoint: 1200,
								settings: {
									vertical: false,
									slidesToShow: 3,
									slidesPerRow: 1,
									infinite: $infinite,
									slidesToScroll: 3,	
									verticalSwiping: false,
								}
							},
							{
								breakpoint: 960,
								settings: {
									vertical: false,				
									slidesPerRow: 1,
									slidesToShow: 2,
									slidesToScroll: 1,
									infinite: $infinite,
									verticalSwiping: false,
								}
							},
						]
					});
				};
				$('.slick-slider.lp-video-17__slider-thumbs').on('beforeChange', function(event, slick, currentSlide, nextSlide){
				  $('.lp-video-17__slider-big video').trigger('pause');
				  $('.lp-video-17__slider-big ._lp-youtube-video').each(function(){
				      var el_src = $(this).attr("src");
				        $(this).attr("src",el_src);
				        
				  });
				});
				
				
				
				$(window).on('resize', function(){
					setTimeout(function(){
						var $dotItem = $block.find('.lp-video-17__thumbs-dots li button');
						if ($dotItem.hasClass('lp-video-17__slider-dot')) {
							
						}
						else {
							$dotItem.attr('data-elem-type', 'card_container');
							$dotItem.addClass('lp-video-17__slider-dot');
							$dotItem.attr('data-lp-selector','.lp-video-17__slider-dot');
							$dotItem.attr('data-has-event','1');
						}
					},500);
				});
			});
	    }
	}
	
	lp_template.queue.lpSteps7 = function($self) {
	    var $block = $self.find('.js-simple-tabs');

	    if ($block.length) {
	        $block.each(function(){
	        	var $this = $(this);
	        	if (!s3LP.is_cms) {
			        $this.bind('mousewheel', function(e){
				        if(e.originalEvent.wheelDelta /120 > 0) {
				            $this.find('.active:not(:first-child)').removeClass('active').delay(800).prev().addClass('active').delay(800);
				        }
				        else{
				            $this.find('.active:not(:last-child)').removeClass('active').delay(800).next().addClass('active').delay(800);
				        }
				        
	    				if ($this.find('.count').last().hasClass('active') || $this.find('.count').first().hasClass('active')) {
	    					return;
	    				}
	    				else {
	    					e.stopPropagation();
	    					e.preventDefault();
	    				}
				    });
	        	}
	        	
			  $('.js-tab').on('click', function(){
				    var $index = $(this).index() + 1;
				    $this.find('.js-tab-content:nth-child(' + $index + ')').addClass('active').siblings().removeClass('active');
				    $(this).addClass('active').siblings().removeClass('active')
				});
	        });
	    }
	}
	
	lp_template.queue.lpMenu20 = function($self) {
	    var $block = $self.find('.js-phone-btn');

	    if ($block.length) {
	        $block.each(function(){
	        	var $this = $(this);
	        	
	        	$this.on('click', function(){
				    $(this).siblings('.js-phone').toggleClass('active');
				});
				
				if (!s3LP.is_cms) {
					$(document).mouseup(function (e){
					    var div = $(".lp-menu-20-phone");
					    if (!div.is(e.target)
					        && div.has(e.target).length === 0) {
					        div.find('.js-phone').removeClass('active');
					    }
					});
				}
	        });
	    }
	}
	
	
	lp_template.queue.lpCertificate19 = function($self) {
		var $block = $self.hasClass('lp-certificate-19') ? $self : $self.find('.lp-certificate-19');
		
		if ($block.length) {
			$block.each(function(){	
				var $this = $(this),
					$mainSlider = $this.find('.js-main-slick'),
			    	$thumbSlider = $this.find('.js-thumb-slick'),
			    	$prevBtn = $this.find('.js-slider-prev'),
			    	$nextBtn = $this.find('.js-slider-next'),
					$dots = !!$mainSlider.data('dots'),
					$arrows = !!$mainSlider.data('arrows'),
					$autoplay = $mainSlider.data('autoplay'),
					$infinite = $mainSlider.data('infinite'),
					$autoplaySpeed = $mainSlider.data('pause'),
					$speed = $mainSlider.data('speed');
					
					if(s3LP.is_cms){
	                	var $infinite = false,
	              		$autoplay = false;
	                }
	              	else if(typeof ReactLPConstructor == 'object') {
	              		var $infinite = false,
	              		$autoplay = false;
	              	}
				
			    $mainSlider.slick({
			        slidesToShow: 1,
			        slidesToScroll: 1,
			        arrows: false,
			        fade: true,
			        asNavFor: $thumbSlider,
			        infinite: $infinite,
			        speed: $speed,
			        autoplay: $autoplay,
				    autoplaySpeed: $autoplaySpeed,
			        adaptiveHeight: false,
			        responsive: [
			            {
			                breakpoint: 600,
			                settings: {
			                    slidesToShow: 1,
			                    arrows: $arrows
			                }
			            }
			        ]
			    })
			
			    $thumbSlider.slick({
			        slidesToShow: 5,
			        slidesToScroll: 1,
			        asNavFor: $mainSlider,
			        dots: $dots,
			        dotsClass:'lp-certificate-19__thumbs-dots-in',
			        appendDots:$this.find('.lp-certificate-19__thumbs-dots'),
			        infinite: $infinite,
			        speed: $speed,
			        autoplay: $autoplay,
				    autoplaySpeed: $autoplaySpeed,
			        centerMode: false,
			        arrows: $arrows,
			        touches: true,
			        prevArrow: $prevBtn,
			        nextArrow: $nextBtn,
			        focusOnSelect: true,
			        adaptiveHeight: false,
			        centerPadding: '6px',
			        mobileFirst: true,
			        swipeToSlide: false,
			        responsive: [
			            {
			                breakpoint: 600,
			                settings: {
			                    slidesToShow: 4,
			                    centerPadding: '20px'
			                }
			            },
			            {
			                breakpoint: 960,
			                settings: {
			                    slidesToShow: 4,
			                    arrows: true,
			                    centerPadding: '0px'
			                }
			            },
			            {
			                breakpoint: 1380,
			                settings: {
			                    slidesToShow: 5,
			                    arrows: true,
			                    centerPadding: '0px'
			                }
			            }
			        ]
			    });
			    
			    $(window).on('resize', function(){
		        	setTimeout(function(){
		        		var $dotItem = $this.find('.lp-certificate-19__thumbs-dots li button');
		        		if ($dotItem.hasClass('lp-certificate-19__thumbs-dot')) {
		        			
		        		}
		        		else {
					        $dotItem.attr('data-elem-type', 'card_container');
					        $dotItem.addClass('lp-certificate-19__thumbs-dot');
					        $dotItem.attr('data-lp-selector','.lp-certificate-19__thumbs-dot');
					        $dotItem.attr('data-has-event','1');
		        		}
		        	},500);
		        });
			});
	    }
	};
	
	lp_template.queue.lpPartners15 = function($self) {
		
		var $block = $self.hasClass('lp-partners-15') ? $self : $self.find('.lp-partners-15');
		
		$block.each(function(){
			if ($block.length) {
				var $this = $(this),
					$slider = $this.find('.lp-partners-15-items.js-owl-carousel'),
					autoplay = !!$slider.data('autoplay'),
					infinite = !!$slider.data('infinite'),
					nav = !!$slider.data('arrows'),
					dotsEach = !!$slider.data('dots-each'),
					dots = true,
					pause = $slider.data('pause') || 5000,
					speed = $slider.data('speed') || 250,
					$rewind = 0,
					fade = !!$slider.data('fade'),
					$parent = $slider.closest('[data-block-layout]'),
					dataResponse = $slider.data('response'),
					response = {},
					$dots = $this.find('.lp-dots-wrapper');
					
					if(s3LP.is_cms){
	                	var infinite = false,
	                	$rewind = 1,
	              		autoplay = false;
	                }
	              	else if(typeof ReactLPConstructor == 'object') {
	              		var infinite = false,
	              		$rewind = 1,
	              		autoplay = false;
	              		
	              	}
				
				
				try {
					let owl = $slider,
						windowWidth = $(window).width(),
						gridFormer = function(){
						let wrapper = '<div class="lp-partners-15-items-grid"></div>',
							itemsCount = $this.find('.lp-partners-15-items>.lp-partners-15-item').length,
							sliceFunc = function(itemsInGrid){
								for (var i = 0; i < itemsCount/itemsInGrid; i++) {
									$this.find('.lp-partners-15-items>.lp-partners-15-item').slice(0, itemsInGrid).wrapAll(wrapper);
								}
								$this.find('.lp-partners-15-items-grid').each(function(){
									$(this).addClass('_'+$(this).children().length);
								});
							};
		
						if (windowWidth>=600) {
							sliceFunc(4);					
						}
					}
		
					let initOwl = function(){
						owl.owlCarousel({
							dots: true,
							nav: true,
							mouseDrag: false,
							margin: 16,
							autoplay : autoplay,
							loop : infinite,
							rewind: $rewind,
							smartSpeed: speed,
							autoplayTimeout: pause,
							items: 1,
							onInitialized: function(e) {
								var $dotsCount = $this.find('.owl-dot').length;
								
								if (!$dots.length || $dotsCount < 2) {
									$dots.html('');
									return;
								};
								var $dotsHTML = '';
								
								for(var i = 0; i < $dotsCount; i++) {
									$dotsHTML += '<div class="lp-dots-item js-dot-item" data-elem-type="container" data-lp-selector=".lp-dots-item"></div>';
								} 
								
								if (!$dots.hasClass('_unchanged')) {
								
									$dots.html($dotsHTML);
								
								}
								
								$dots.find('.lp-dots-item').eq(0).addClass('active');
								
							},
							
							onResized: function(e) {
								if (!$dots.length || e.page.count < 2) {
									$dots.html('');
									return;
								}
								
								var $dotsHTML = '';
								for(var i = 0; i < e.page.count; i++) {
									$dotsHTML += '<div class="lp-dots-item js-dot-item" data-elem-type="container" data-lp-selector=".lp-dots-item"></div>';
								}
								
								if (!$dots.hasClass('_unchanged')) {
									$dots.html($dotsHTML);
								}
								$dots.find('.lp-dots-item').removeClass('active');
								$dots.find('.lp-dots-item').eq(e.page.index).addClass('active');
							},
							onTranslated: function(e) {
								$dots.find('.lp-dots-item').removeClass('active');
								$dots.find('.lp-dots-item').eq(e.page.index).addClass('active');
							}
						});
						
						$this.find('.js-next-slide').off();
						$this.find('.js-next-slide').on('click', function(e) {
							e.preventDefault();
							owl.trigger('next.owl.carousel');
						});
						$this.find('.js-prev-slide').off();
						$this.find('.js-prev-slide').on('click', function(e) {
							e.preventDefault();
							owl.trigger('prev.owl.carousel');
						});
						
						$this.find('.js-dot-item').on('click', function(e) {
							e.preventDefault();
							owl.trigger('to.owl.carousel', [$(this).index()]);
						});
						
					}
		
					let reInitOwl = function(){
						owl.trigger('destroy.owl.carousel');
						if (windowWidth<600) {
							$this.find('.lp-partners-15-item').unwrap();
						}				
						gridFormer();
						initOwl();
					}
		
					gridFormer();
					
			        initOwl();
		
		
					$(window).resize(function(){				
						let newWindowWidth = $(window).width();
						if (windowWidth<600){
							if (newWindowWidth>=600) {
								windowWidth = newWindowWidth;
								reInitOwl();
							}
						} else if (windowWidth>=600){
							if (newWindowWidth<600) {
								windowWidth = newWindowWidth;
								reInitOwl();
							}
						}
					});
		
				} catch(exception) {
					console.log(exception);
				}
			}
		});
	}
	
	lp_template.queue.lpStaff7 = function($self) {
		
		var $block = $self.hasClass('lp-staff-7') ? $self : $self.find('.lp-staff-7');
		
		if ($block.length) {
			$block.each(function(){
			
				var $this = $(this);
				
				$this.find('.lp-header-tab').not('._active').on('click', function(){
					$(this).addClass('_active').siblings().removeClass('_active');
		  			$this.find('.lp-staff-body-items').removeClass('_active').eq($(this).index()).addClass('_active');
				});
	
				$this.find('.lp-header-tab').first().addClass('_active');
				$this.find('.lp-staff-body-items').first().addClass('_active');
	
			    var widthSum = 0;
			    $this.find('.lp-header-tab').each(function () {
			        widthSum +=  +$(this).outerWidth(true)
			    })
	
			    if(widthSum > $('.lp-header-tabs').width()) {
			        baron({
			            root: '.lp-staff-7-scroll',
			            scroller: '.lp-staff-7-scroll__inner',
			            bar: '.lp-staff-7-scroll__bar',
			            scrollingCls: '_scrolling',
			            draggingCls: '_dragging',
			            direction: 'h',
	
			        })
			    }
			
			});
		}
	}
	
	lp_template.queue.lpForm29 = function($self) {
		var $block = $self.hasClass('lp-form-29') ? $self : $self.find('.lp-form-29');

		if ($block.length) {

			$block.each(function() {
				var $this = $(this);
		
				try {      
						setMinHeight();
						$(window).on('resize', function(){
						setMinHeight();        
					});      
				} catch(exception) {
					console.log(exception);
				}
				
				function setMinHeight() {
					if (window.matchMedia('(min-width: 960px)').matches) {
						var formHeight = $this.find('.lp-form-29__form').height() 
						+ parseInt($this.find('.lp-form-29__form').css('padding-top'))
						+ parseInt($this.find('.lp-form-29__form').css('padding-bottom')),
						minHeight = formHeight - 160;
				
						$this.find('.lp-form-29__top').css({
							minHeight : minHeight           
						});
						
						var topHeight = $this.find('.lp-form-29__top').height();
						
						if (topHeight > (formHeight + 40)) {
							$this.find('.lp-form-29__top').css({'margin-top' : '40px'});
						} else {
							$this.find('.lp-form-29__top').css({'margin-top' : ''});
						}
					} else {
						$this.find('.lp-form-29__top').css({
							minHeight : '',
							'margin-top' : ''          
						});
					}
				};
			});
		}		
	};
	
	lp_template.queue.lpFeatures29 = function($self) {
	    var $block = $self.find('.lp-features-29-item__percentage');
	    if ($block.length) {
	        function perc() {
		        $block.each(function(){
		            var $this = $(this),
		            	$parent = $this.closest('.lp-features-29-item'),
		            	$inner = $parent.find('.lp-features-29-item__field-inner'),
		            	$percent = Number.isNaN(parseInt($this.text())) ? 0 : parseInt($this.text()),
		            	$percent = $percent < 101 ? $percent : 100;
					
					$inner.css('width', $percent + '%');
					$this.text($percent + '%');
		        });
	        }
						    
			if (s3LP.is_cms && typeof LpController !== 'undefined') {
				setTimeout(function(){
					LpController.afterSave(function () {
						perc();
					});
				},1000);
			}
	    }
	}
	
	lp_template.queue.QRcode = function ($self) {
		let $block = $self.find('.lp_qr_init');
	
		if ($block.length) {
			$block.each(function () {
				let item = $(this);
				let messengerWrap = item.find('.lp_qr_code_item');
	
				messengerWrap.each(function () {
					let item = $(this);
					let containerQr = item.find('.lp_qr_code_container');
					let containerQrPhone = item.find('.lp_qr_code_container_phone');
	
					let messengerLinks = item.find('.lp_qr_code_link');
					let messengerLinksPhone = item.find('.lp_qr_code_link_phone');
	
					let urls = messengerLinks.map(function () {
						return $(this).attr('href');
					}).get();
	
					let urlsPhone = messengerLinksPhone.map(function () {
						return $(this).attr('href').replace(/[^\d+]/g, '');
					}).get();
	
					let sizes = messengerLinks.map(function () {
						return $(this).attr('data-qr-code-size');
					}).get();
	
					let sizesPhone = messengerLinksPhone.map(function () {
						return $(this).attr('data-qr-code-size');
					}).get();
	
					urls.forEach(function (url, index) {
						if (containerQr.length) {
							createQR(containerQr.eq(index), sizes[index], url);
							$('body').append(containerQr.eq(index));
						}
					});
	
					urlsPhone.forEach(function (url, index) {
						if (containerQrPhone.length) {
							createQR(containerQrPhone.eq(index), sizesPhone[index], url);
							$('body').append(containerQrPhone.eq(index));
						}
					});
	
					messengerLinks.hover(function () {
						let index = messengerLinks.index(this);
						showQR(containerQr.eq(index), $(this));
					}, function () {
						let index = messengerLinks.index(this);
						hideQR(containerQr.eq(index));
					});
	
					messengerLinksPhone.hover(function () {
						let index = messengerLinksPhone.index(this);
						showQR(containerQrPhone.eq(index), $(this));
					}, function () {
						let index = messengerLinksPhone.index(this);
						hideQR(containerQrPhone.eq(index));
					});
				});
	
				function createQR(container, size, url) {
					container.qrcode({
						width: size,
						height: size,
						text: url
					}).css({
						position: 'absolute',
						display: 'none',
						zIndex: 1000
					});
				}
	
				 function showQR(container, link) {
	                let linkOffset = link.offset();
	                let containerWidth = container.outerWidth();
	                let containerHeight = container.outerHeight();
	
	                let left = linkOffset.left; // Относительно левого края наведенного элемента
	                let top = linkOffset.top - containerHeight - 10;

					// Проверяем, выходит ли контейнер за пределы экрана справа
				    if (left + containerWidth > $(window).width()) {
				        left = linkOffset.left - containerWidth + link.outerWidth();
				    }
	
	                container.css({
	                    top: top,
	                    left: left,
	                    display: 'block'
	                });
	            }
	
				function hideQR(container) {
					container.css({
						display: 'none'
					});
				}
			});
		}
	};
	
	lp_template.queue.albumGallery = function ($self) {
	    let $block = $self.find('.lp-album-gallery-init');
	
	    if ($block.length) {
	        $block.each(function () {
	            let $this = $(this);
	            let item = $this.find('.lp-gallery-click');
	            let popup = $this.find('.lp-album-gallery-popup');
	            let popupItems = $this.find('.lp-album-gallery-popup__item');
	            let buttonBack = $this.find('.lp-album-gallery-popup__back');
	            let buttonClose = $this.find('.lp-album-gallery-popup__close');
	
	            let body = $('body');
	            let popupImageBox = popup.find('.lp-album-gallery-popup__image-box');
				let mosaicWrap = $(document).find('.mosaic-wrap');

				setTimeout(function(){
					if (mosaicWrap.length && !$block.hasClass('lp_constructor')) {
					    mosaicWrap.prepend(popup);
					}
				}, 350);
	            
	            if (popup.find('.js-new-lg-init').length) {
	            	
	            	popupImageBox.click(function () {
		                popup.addClass('is-hidden'); 
		            });
		
		            body.on('click', function (event) {
		                if (!$(event.target).closest('.lg-prev, .lg-next, .lg-toolbar, .lg-image, .lp-album-gallery-popup, .lp-album-gallery-popup__image-box').length) {
		                    popup.removeClass('is-hidden');
		                }
		                
		                if ($(event.target).closest('.lg-close').length) {
		                	popup.removeClass('is-hidden');
		                } 
		            });
	            }
	
	            item.click(function () {
	                let dataIndex = $(this).data("index");
	
	                popup.fadeIn().addClass("active");
	                $(this).closest('.lp-album-gallery').addClass('_opened-popup');
	
	                if (!isMobile) {
	                    $("body").css({ 'padding-right': '17px' });
	                }
	
	                $("html").addClass("lp-no-scroll");
	                popupItems.removeClass("active");
	                popupItems.filter("[data-index='" + dataIndex + "']").addClass("active");
	            });
	
	            buttonBack.click(function () {
	            	$(this).closest('.lp-album-gallery').removeClass('_opened-popup');
	                popup.fadeOut().removeClass("active");
	                $("body").css({ 'padding-right': '' });
	                $("html").removeClass("lp-no-scroll"); 
	                popupItems.removeClass("active");
	            });
	
	            buttonClose.click(function () {
	            	$(this).closest('.lp-album-gallery').removeClass('_opened-popup');
	                popup.fadeOut().removeClass("active");
	                $("body").css({ 'padding-right': '' });
	                $("html").removeClass("lp-no-scroll"); 
	                popupItems.removeClass("active");
	            });
	
				$(document).keydown(function (e) {
					if (e.keyCode === 27 && !$('.lg-outer').length) { 
						popup.closest('.lp-album-gallery').removeClass('_opened-popup');
						popup.fadeOut().removeClass("active");
						$("body").css({ 'padding-right': '' });
						$("html").removeClass("lp-no-scroll"); 
						popupItems.removeClass("active");
					}
					
					popup.removeClass('is-hidden');
				});
	        });
	    }
	};
	
	lp_template.queue.anchorMenu = function ($self) {
		let $block = $self.find('.lp_anchor_menu_init');
	
		if ($block.length) {
			let links = $block.find('.lp-anchor-menu-fixed__link');
			let choiceElem = $block.attr('data-lp-choice-elem');
			let booleanValue = (choiceElem === 'true');
			let fixedBlock = $block.find('.lp-anchor-menu-fixed');
			let mosaicWrap = $(document).find('.mosaic-wrap');
			let button = $block.find('.lp-anchor-menu-fixed__button-text');
			let $lpWrap = $(document);
	
			let hiddenBlockIds = [];
			
			$lpWrap.each(function () {
			    let $this = $(this);
			
			    if (s3LP.is_cms) {
			        $this.find('.popup-row-block').each(function() {
			            let s3lpPopupValue = $(this).find('[data-blocks-popup]').data('blocks-popup');
			            hiddenBlockIds.push(s3lpPopupValue);
			        });
			    } else {
			        let blocksPopupValue = $this.find('[data-blocks-popup]').data('blocks-popup');
					let blocksPopupValue2 = $this.find('._hide-block').data('block-id');
					
					hiddenBlockIds.push(blocksPopupValue === undefined ? blocksPopupValue2 : blocksPopupValue);
			    }
			});
			
			if (isMobile) {
			    let touchStartX = 0, touchEndX = 0;
			    let isActive = false;
			    
			    button.on('click', function () {
			        if (isActive && fixedBlock.hasClass('active')) {
			            fixedBlock.removeClass('active');
			            isActive = false;
			        } else {
			            fixedBlock.addClass('active');
			            isActive = true;
			        }
			    });
			
			    button.on('touchstart', function(e) {
			        touchStartX = e.originalEvent.touches[0].clientX;
			    });
			
			    button.on('touchmove', function(e) {
			        touchEndX = e.originalEvent.touches[0].clientX;
			    });
			
			    button.on('touchend', function(e) {
			        handleButtonSwipe();
			    });
			
			    function handleButtonSwipe() {
			        var swipeLength = touchEndX - touchStartX; 
			        if (swipeLength > 100) {
			            fixedBlock.removeClass('active'); 
			        } else if (swipeLength < -100) {
			            fixedBlock.addClass('active'); 
			        }
			       
			        touchStartX = 0;
			        touchEndX = 0;
			    }
			    
			    $(document).on('keydown', function (e) {
			        if (e.keyCode === 27) {
			            fixedBlock.removeClass('active');
			        }
			    });
			
			    $(document).on('click', function (e) {
			        if (!$(e.target).closest('.lp-anchor-menu-fixed').length) {
			            fixedBlock.removeClass('active');
			        }
			    });
			}
	
			setTimeout(function(){
				let buttonHeight = $block.find('.lp-anchor-menu-fixed__button').outerHeight();
				let listHeight = $block.find('.lp-anchor-menu-fixed__list').outerHeight();
				let listBlock = $block.find('.lp-anchor-menu-fixed__list');
				
				var $wrapBlock = $block.closest('.lp-anchor-menu');
			    var blockId = $wrapBlock.attr('id');
			    var blockLayout = $wrapBlock.attr('data-block-layout');
				
				if (buttonHeight === listHeight) {
				    listBlock.addClass('no-border-radius');
				} else {
					listBlock.removeClass('no-border-radius');
				}
				
				if (mosaicWrap.length && !$block.hasClass('lp_constructor')) {
					mosaicWrap.prepend(fixedBlock);
					
					fixedBlock.attr('id', blockId);
				    fixedBlock.attr('data-block-layout', blockLayout);
				}
				
			}, 350);
	
			links.each(function () {
			    let $this = $(this);
			    let blockId = $this.attr('href').replace('#', '');
			    let offsetValue = parseFloat($this.attr('data-lp-offset'));
			    let offsetValueMobile = parseFloat($this.attr('data-lp-offset-mobile'));
			    let targetBlock = $('#' + blockId);
			    let headerElements = targetBlock.find('[data-elem-type="header"]:not(.lp-list-illustration__title--hidden)'); 
			    
			    let blockPopupId = parseFloat($this.attr('href').replace(/\D/g, '')); // РџРѕР»СѓС‡Р°РµРј id Р±Р»РѕРєР° РёР· Р°С‚СЂРёР±СѓС‚Р° href
				
				if (hiddenBlockIds.includes(blockPopupId)) {
					$this.parent('.lp-anchor-menu-fixed__item').remove();
				}
			   
			    if (headerElements.length > 0 && $this.hasClass('lp-has-block-name')) {
			        let headerText = headerElements.first().text(); 
			        $this.text(headerText);
			    }
			
			    if (booleanValue === false && headerElements.length === 0) {
			        if ($this.length > 0) {
					    $this.parent().remove();
					}
			    } else {
			        $this.on('click', function (event) {
			            event.preventDefault();
			
			            links.removeClass('active');
			            $this.addClass('active');
			            
			            var targetBlockOffset = isMobile ? targetBlock.offset().top - offsetValueMobile : targetBlock.offset().top - offsetValue;
	    
				        if (targetBlock.length) {
				            $('html, body').stop().animate({
				                scrollTop: targetBlockOffset
				            }, 800, function () {
				                history.pushState(null, null, '#' + blockId);
				            });
				        }
			        });
			    }
			    
			    links.removeClass('lp-opacity');
			    
			});
		}
	};
	
	lp_template.queue.scrollTop = function($self) {
		var $block = $self.find('.scrollHide');
		if ($block.length) {
			if($block.closest('.lp-elements-to-top').length) {
				var $this = $(this),
				$scrollBtn = $self.find('.js-19-elem');
				
				var lastScrollTop = 0;
			    var delta = 50; // Небольшая "мертвая зона" для скролла
			    var scrollThreshold = 500; // Порог в 500px из вашего примера
					
				$(window).on('scroll', function(){
					var $scrollTop = $(this).scrollTop();
					if ($scrollTop < lastScrollTop && $scrollTop > scrollThreshold) {
						$scrollBtn.addClass('_show');
					}
					else {
						$scrollBtn.removeClass('_show');
					}
					lastScrollTop = $scrollTop;
				});
			}else{
				var $this = $(this),
					$scrollBtn = $self.find('.js-19-elem');
				$(window).on('scroll', function(){
					var $scrollTop = $(this).scrollTop();
					if ($scrollTop > 500) {
						$scrollBtn.addClass('_show');
					}
					else {
						$scrollBtn.removeClass('_show');
					}
					
				});
			}
		}
	}
	
	lp_template.queue.minHeight = function($self) {
		var $block = $self.find('.js-min-height'),
			func = function() {
				$block.each(function(){
					var $this = $(this),
						$title = $this.find('.js-item'),
						$border = $this.find('._title'),
						minWidth = $this.data('min-width') || 0,
						minHeight = $title.eq(0).height();
						
					$border.css({
						minHeight: 0
					});
					
					if ($(window).width() >= minWidth) {
						$title.each(function(){
							var thisHeight = $(this).height();
							
							if (minHeight > thisHeight) {
								minHeight = thisHeight;
							}
						});	
						
						$border.css({
							minHeight: minHeight
						});
					}
				});
			};
			
		$(window).on('resize', func);
		if (s3LP.is_cms && typeof LpController !== 'undefined') {
			setTimeout(function(){
				LpController.afterSave(function () {
				    func();
				});
			},1000);
		}
	}
	
	lp_template.queue.animatedAnchor = function($self) {
		var $block = $self;
		
		if ($(".js-19-elem").length) {
			$block.find(".js-19-elem").on('click touch', function(e){
				e.preventDefault();
				$('html, body').animate({
			        scrollTop: $("body").offset().top
			    }, 2000);
			});
		}
	}
	
	lp_template.queue.previewModeIsCms = function($self) {
		setTimeout(function(){
			if ($('body').hasClass('preview_mode')) {
				$('._is-cms').removeClass('_is-cms');
			}
		}, 2000);
	}
	
	/* Тестовый фрагмент скрипта, не удалять  */
	lp_template.queue.headerNewPopup = function($self) {
	    let block = $self.find('.lp-new-header');
	
	    if (block.length) {
	        block.each(function() {
	            let $this = $(this);
	            let phoneList = $this.find('.lp-new-header-phone');
	            let showAllButton = $this.find('.lp-new-header__more');
	            let phoneItem = phoneList.find('.lp-new-header-phone__item:hidden');
	            let currentText = showAllButton.text();
	            let hideText = $('html').attr('lang') === 'ru' ? 'Скрыть' : 'Hide';
	            let overlay = $this.find('.lp-new-header-popup-overlay');
	            let popup = $this.find('.lp-new-header-popup');
	            let popupInner = $this.find('.lp-new-header-popup__inner');
	            let popupButton = $this.find('.lp-new-header-popup-button');
	            let popupClose = $this.find('.lp-new-header-popup__close');
	
	            showAllButton.on('click', function () {
	                $(this).toggleClass('active');
	                phoneList.toggleClass('is-active');
	                $(this).text(showAllButton.hasClass('active') ? hideText : currentText);
	            });
	            
	            function openPopup() {
	                overlay.addClass('is-open');
	                popup.addClass('is-open');
	                $('html').css("overflow", "hidden");
	            }
	           
	            function closePopup() {
	                overlay.removeClass('is-open');
	                popup.removeClass('is-open');
	                $('html').css("overflow", "auto");
	            }
	
	            popupButton.click(openPopup);
	            popupClose.click(closePopup);
	            
	            $(document).keyup(function(e) {
	                if (e.key === "Escape" && overlay.hasClass('is-open')) {
	                    closePopup();
	                }
	            });
	
	            // Обработчик клика вне всплывающего окна для его закрытия
	            //$(document).mouseup(function(e) {
	            //    if (!popupInner.is(e.target) && popupInner.has(e.target).length === 0) {
	            //        closePopup();
	            //    }
	            //});
	        });
	    }
	};
	/* Тестовый фрагмент скрипта, не удалять  */
	
	lp_template.queue.fixedMenu = function($self) {
		var $block = $self.hasClass('js-fixed-menu') ? $self : $self.find('.js-fixed-menu');
		var $fixedElem = $block.find('._fixed-element');
		
		$block.data('isFixed', false);
		
		$fixedElem = $fixedElem.length ? $fixedElem : $block;
		
		$block.each(function(){
			var $this = $(this);
			
			$this.data('topPosition', $this.offset().top);
		});
		
		if ($block.length) {
			$win.on('scroll', function(e){
				$block.each(function(){
					var $this = $(this),
						isAfterScroll = !!$this.data('after-scroll'),
						$thisBurger = $this.find('.js-burger'),
						$fixedElem = $this.find('._fixed-element');
					
					$fixedElem = $fixedElem.length ? $fixedElem : $this;
					
					var position = $this.data('isFixed') ? $fixedElem[0].parentNode.getBoundingClientRect() : this.getBoundingClientRect();
					
					if ( !$this.data('isFixed') && ((!isAfterScroll && position.top <= 0) || (isAfterScroll && position.top <= 0 - $this.outerHeight()))) {
						if (!s3LP.is_cms) {	
							$fixedElem.wrap('<div class="fixed-element-wrap"></div>');
							$(window).on('resize', function(){
								//$fixedElem.closest('.fixed-element-wrap').height($fixedElem.height());
								$fixedElem.closest('.fixed-element-wrap').height($fixedElem.outerHeight());
							});
							$win.trigger('resize');
							//$fixedElem.closest('.fixed-element-wrap').height($fixedElem.height());
							$fixedElem.addClass('_to-fix-menu');
							$this.data('isFixed', true);
							if ($thisBurger.hasClass('add_in-side')) $thisBurger.addClass('_in-side');
						}
					} else if ($this.data('isFixed') && (position.top > 0 || (isAfterScroll && $win.scrollTop() < $this.data('topPosition')))) {
						$fixedElem.removeClass('_to-fix-menu');
						$this.data('isFixed', false);
						$thisBurger.removeClass('_in-side');
						$win.trigger('resize');
						$fixedElem.unwrap();
					}
				});
			}).trigger('scroll');
		}
	};
	
	lp_template.queue.autoplayVideo = function($self) {
		var $block = $self.find('[data-autoplay-video="1"]');
	
		if ($block.length) {
			
			$block.on('autoplayVideo', function(e, type, nodeName) {
				
				var video = this.querySelector(nodeName);
				if (nodeName === 'video') {
					if (type === 'play') {
						video.play();
					} else {
						video.pause();
					}					
				} else if (nodeName === 'iframe') {
					var video = $(video).data('youtube');
					if (type === 'play') {
						setTimeout(function() {
						video.playVideo();
						 }, 500);
						
					} else {
						video.pauseVideo();
					}
				}
				
			});
		}
	}
	
	window.lp_init = function($block) {
		
		if (typeof ReactLPConstructor == 'object') {
		    s3LP.is_cms = true;
		} // чтобы флаг заработал в новом конструкторе
	
		var partners_2_img_h = $('.lp-partners_2__list-item').data('image-height');
		$('.lp-partners_2__list-item').css('height', partners_2_img_h);
		setTimeout(function() {
			$('.lp-partners_2__list-item').removeAttr('style');
		}, 2500);
	
		var $autoplayVideo = $doc.find('[data-autoplay-video="1"]');
		var $maps = $block.find('.js-lp-simple-map');

	    if ($maps.length) {
	       
	        lp_template.checkMapInitialization($maps);
	        
	        $(window).on('scroll resize', function () {
	            lp_template.checkMapInitialization($maps);
	        });
	        
	    } else {
	        console.warn('Карты не найдены на странице!');
	    }
	    
		if ($autoplayVideo.length && !s3LP.is_cms) {
			$win.on('scroll', function() {
				lp_template.checkAutoplayVideo($autoplayVideo);
			});
		}
	
		Object.keys(lp_template.queue).forEach(function(func) {
			var thisFunction = lp_template.queue[func];
			if (typeof thisFunction == 'function') {
				thisFunction($block);
			}
		});
		
		$win.trigger('resize');
		
		setTimeout(function() {
			$win.trigger('resize');
		}, 700);
		
		
		$.getScript("/g/s3/misc/animator/1.1.0/js/s3.animator.js", function(){
			$('body').append('<link rel="stylesheet" type="text/css" href="/g/s3/misc/animator/1.0.0/css/s3.animator.scss.css">');
			s3Animator.once = true;
			
			setTimeout(function() {
				s3Animator.updateElements()
			}, 500);
		});

		
		/*setTimeout(function() {
			$win.trigger('scroll');
		}, 2000);*/
		document.dispatchEvent(new Event('lp_init_after', {bubbles: true}));
		
	}

	window.onYouTubeIframeAPIReady = function() {
		$(function(){
			var listYoutube = $('.js-lp-video-youtube');
			
			listYoutube.each(function(){
				var $this = $(this),
					isFullFrame = $this.hasClass('_not-paused');
				
				var player = new YT.Player(this.id, {
					iv_load_policy: 3,
					modestbranding: 1,
					rel: 0,
					mute: isFullFrame ? 1 : 0,
					playsinline: 1,
					showinfo: isFullFrame ? 0 : 1,
					events: {
						'onStateChange': function(event) {
							if (event.data == YT.PlayerState.ENDED && isFullFrame) {
								event.target.playVideo();
							}
						}
					}
				});
	
				$this.data('youtube', player);
				
				$('.slick-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
				});
			});
		});
	}
	
	function isElementInViewport(el) {
	    const rect = el.getBoundingClientRect();
	    return (
	        rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.bottom > 0 && rect.left < (window.innerWidth || document.documentElement.clientWidth) && rect.right > 0
	    );
	}
	
	// function isElementInViewport(el) {
	// 	var rect = el.getBoundingClientRect();
	// 	return (
	// 		rect.top <= window.innerHeight-200 &&
	// 		rect.bottom >= 50
	// 	);
	// }

})();

document.addEventListener("DOMContentLoaded", function () {
    let lpContent = document.getElementById("lp_constructor");
    let timeout = 20;
    if (lpContent) {
        timeout = 1500;
    }
    
    setTimeout(function () {
    	
	    const toRGBAArray = (rgbStr) => {
	        const values = rgbStr.match(/[\d.]+/g).map(Number);
	        
	        if (values.length === 3) values.push(1);
	        return values;
	    };
	
	    const baseTextColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color-base').trim();
	
	    document.querySelectorAll('.has_custom_bg').forEach(function (element) {
	        const computedStyle = window.getComputedStyle(element);
	        const bgColor = computedStyle.backgroundColor;
	        const rgba = toRGBAArray(bgColor);
	        const alpha = rgba[3];
	       
	        if (bgColor === "transparent" || alpha === 0) {
	            element.style.color = baseTextColor;
	            element.querySelectorAll('[data-elem-type="text"], [data-elem-type="header"], [data-elem-type="generate"], [data-elem-type="button"].lp-button--type-3, .has-custom-bg-item').forEach(function (innerElem) {
	                innerElem.style.color = baseTextColor;
	            });
	            return;
	        }
	
	        const brightness = Math.round((rgba[0] * 299 + rgba[1] * 587 + rgba[2] * 114) / 1000);
	        const textColor = brightness > 150 ? baseTextColor : '#fff';
	
	        element.style.color = textColor;
	        element.querySelectorAll('[data-elem-type="text"], [data-elem-type="header"], [data-elem-type="generate"], [data-elem-type="button"].lp-button--type-3, .has-custom-bg-item').forEach(function (innerElem) {
	            innerElem.style.color = textColor;
	        });
	    });
	
	    document.querySelectorAll('.ya-share2').forEach(function (element) {
	        const computedStyle = window.getComputedStyle(element);
	        const rgba = toRGBAArray(computedStyle.backgroundColor);
	        const alpha = rgba[3];
	
	        const brightness = Math.round((rgba[0] * 299 + rgba[1] * 587 + rgba[2] * 114) / 1000);
	
	        if (alpha === 0 || computedStyle.backgroundColor === "transparent" || brightness > 150) {
	            element.classList.add("lp-share-light-mode");
	        } else {
	            element.classList.add("lp-share-dark-mode");
	        }
	    });
	}, timeout);
    
    
    /*setTimeout(function () {

        const toRGBArray = rgbStr => rgbStr.match(/\d+/g).map(Number);

        document.querySelectorAll('.has_custom_bg').forEach(function (element) {
            let customBg = toRGBArray(window.getComputedStyle(element).backgroundColor);
            let textColor = Math.round((parseInt(customBg[0]) * 299 + parseInt(customBg[1]) * 587 + parseInt(customBg[2]) * 114) / 1000);

            if (textColor > 150) {
                element.style.color = '#000';
                element.querySelectorAll('[data-elem-type="text"]').forEach(function (textElement) {
                    textElement.style.color = '#000';
                });
                element.querySelectorAll('[data-elem-type="header"]').forEach(function (headerElement) {
                    headerElement.style.color = '#000';
                });
                element.querySelectorAll('[data-elem-type="generate"]').forEach(function (generateElement) {
                    generateElement.style.color = '#000';
                });
            } else {
                element.style.color = '#fff';
                element.querySelectorAll('[data-elem-type="text"]').forEach(function (textElement) {
                    textElement.style.color = '#fff';
                });
                element.querySelectorAll('[data-elem-type="header"]').forEach(function (headerElement) {
                    headerElement.style.color = '#fff';
                });
                element.querySelectorAll('[data-elem-type="generate"]').forEach(function (generateElement) {
                    generateElement.style.color = '#fff';
                });
            }
        });
        
        document.querySelectorAll('.ya-share2').forEach(function (element) {
            let customBgShare = toRGBArray(window.getComputedStyle(element).backgroundColor);
            let textColorShare = Math.round((parseInt(customBgShare[0]) * 299 + parseInt(customBgShare[1]) * 587 + parseInt(customBgShare[2]) * 114) / 1000);

            if (textColorShare > 150) {
                $('.ya-share2').addClass("lp-share-light-mode");
            } else {
                $('.ya-share2').addClass("lp-share-dark-mode");
            }
        });
    }, timeout);*/
    
    setTimeout(() => {
        const calculators = document.querySelectorAll('.lp-calculator');

        if (calculators.length) {
            calculators.forEach(calculator => {
                const calc = new Calculator(calculator);
                calc.init();
            });
        }
    }, 500);
});




class Calculator {
	constructor(calculator) {
		this.calculator = calculator;
		this.calculateButton = this.calculator.querySelector('.calculate_button');
		this.calculateFormula = this.calculateButton.getAttribute('data-calculator-formula');
		this.calculateResult = this.calculator.querySelector('.js_calculate_result');
		this.calculateInputs = Array.from(this.calculator.querySelectorAll('input'));
		this.calculateErrorBlock = this.calculator.querySelector('.calculate-error-block');
	}

	parseCalculatorFormula(formula) {
		let variableRegex = '([a-zA-Z0-9]?[a-zA-Z]+)';
		let formulaVariables = Array.from(formula.matchAll(variableRegex));
		let parsedFormula = formula;
		for (const formulaVariable of formulaVariables) {
			let inputValue = this.calculator.querySelector(`input[data-calculator-alias=${formulaVariable[0]}]`).value;
			parsedFormula = parsedFormula.replace(formulaVariable[0], inputValue ? inputValue : NULL);
		}

		return eval(parsedFormula);
	}

	initializeRangeFields(fields) {
		fields.forEach((field) => {
			let input = field;
			let parent = input.parentNode;
			let min = parseFloat(input.min);
			let max = parseFloat(input.max);
			let current = parent.querySelector(".lp-calculator-range--current");
			let currentLine = parent.querySelector(".lp-calculator-range--current-line");

			const updateCurrentPosition = () => {
				let value = parseFloat(input.value);
				current.textContent = value;

				let currentWidth = current.getBoundingClientRect().width;
				let currentPos = (100 * (value - min) / (max - min));

				if (currentPos < 0) {
					currentPos = 0;
				} else if (currentPos > 100) {
					currentPos = 100;
				}

				current.style.left = `${(currentPos / 100) * (input.getBoundingClientRect().width - currentWidth)}px`;
				currentLine.style.width = `${currentPos}%`;
			};

			field.addEventListener("input", updateCurrentPosition);
			updateCurrentPosition();
		});
	}

	initializeNumberFields(fields) {
		fields.forEach((field) => {
			let input = field;
			let parent = input.parentNode;
			let min = input.min;
			let step = input.step;
			let max = input.max;
			let decrementButton = parent.querySelector(".lp-calculator-number--dec");
			let incrementButton = parent.querySelector(".lp-calculator-number--inc");
	
			input.addEventListener("change", () => {
				const value = Number(input.value);
				if (value >= max) {
					incrementButton.setAttribute("disabled", true);
					decrementButton.removeAttribute("disabled");
					input.value = max;
				} else if (value <= min) {
					input.value = min;
					incrementButton.removeAttribute("disabled");
					decrementButton.setAttribute("disabled", true);
				} else {
					incrementButton.removeAttribute("disabled");
					decrementButton.removeAttribute("disabled");
				}
			});
	
			decrementButton.addEventListener("click", () => {
				incrementButton.disabled = false
				let current = input.value
				let currentVal = current - step
	
				if (currentVal <= min) {
					input.textContent = min
					decrementButton.disabled = true
					return input.value = min
				}
	
				input.textContent = currentVal
				return input.value = currentVal
			});
	
			incrementButton.addEventListener("click", () => {
				decrementButton.disabled = false
				let current = input.value
				let currentVal = Number(current) + Number(step)
	
				if (Number(currentVal) >= Number(max)) {
					incrementButton.disabled = true
					input.textContent = max
					return input.value = max
				}
	
				input.textContent = currentVal
				return input.value = currentVal
			});
		})
	}


	initializeFieldTypes() {
		let rangeFields = this.calculateInputs.filter((item) => item.classList.contains('lp-calculator-input--range'));
		let numberFields = this.calculateInputs.filter((item) => item.classList.contains('lp-calculator-input--number'));

		this.initializeRangeFields(rangeFields);
		this.initializeNumberFields(numberFields);
	}
	
	init() {
	    this.initializeFieldTypes();
	    this.calculateButton.addEventListener('click', () => {
	        this.calculateErrorBlock.innerHTML = '';
	        try {
	            const result = this.parseCalculatorFormula(this.calculateFormula);
	            if (!isNaN(result) && isFinite(result)) {
	                this.calculateResult.querySelector('span').textContent = result.toFixed(2);
	                console.log(result);
	            } else {
	                this.calculateErrorBlock.innerHTML += '<p>Проверьте корректность введенных данных</p>';
	                this.calculateResult.querySelector('span').textContent = 0;
	            }
	        } catch (e) {
	            this.calculateErrorBlock.innerHTML += '<p>Проверьте корректность введенных данных</p>';
	            this.calculateResult.querySelector('span').textContent = 0;
	        }
	    });
	}
}


/*function letItSnow() {
	  var COUNT = 30;
	  var masthead = document.querySelector('.sky');
	  var canvas = document.createElement('canvas');
	  var ctx = canvas.getContext('2d');
	  var width = masthead.clientWidth;
	  var height = masthead.clientHeight;
	  var i = 0;
	  var active = false;
	
	  function onResize() {
	    width = masthead.clientWidth;
	    height = masthead.clientHeight;
	    canvas.width = width;
	    canvas.height = height;
	    ctx.fillStyle = '#FFF';
	
	    var wasActive = active;
	    active = width > 600;
	
	    if (!wasActive && active)
	      requestAnimFrame(update);
	  }
	
	  var Snowflake = function () {
	    this.x = 0;
	    this.y = 0;
	    this.vy = 0;
	    this.vx = 0;
	    this.r = 0;
	
	    this.reset();
	  }
	
	  Snowflake.prototype.reset = function() {
	    this.x = Math.random() * width;
	    this.y = Math.random() * -height;
	    this.vy = 1 + Math.random() * 3;
	    this.vx = 0.5 - Math.random();
	    this.r = 1 + Math.random() * 2;
	    this.o = 0.5 + Math.random() * 0.5;
	  }
	
	  canvas.style.position = 'absolute';
	  canvas.style.left = canvas.style.top = '0';
	
	  var snowflakes = [], snowflake;
	  for (i = 0; i < COUNT; i++) {
	    snowflake = new Snowflake();
	    snowflake.reset();
	    snowflakes.push(snowflake);
	  }
	
	  function update() {
	
	    ctx.clearRect(0, 0, width, height);
	
	    if (!active)
	      return;
	
	    for (i = 0; i < COUNT; i++) {
	      snowflake = snowflakes[i];
	      snowflake.y += snowflake.vy;
	      snowflake.x += snowflake.vx;
	
	      ctx.globalAlpha = snowflake.o;
	      ctx.beginPath();
	      ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
	      ctx.closePath();
	      ctx.fill();
	
	      if (snowflake.y > height) {
	        snowflake.reset();
	      }
	    }
	
	    requestAnimFrame(update);
	  }
	
	  // shim layer with setTimeout fallback
	  window.requestAnimFrame = (function(){
	    return  window.requestAnimationFrame       ||
	            window.webkitRequestAnimationFrame ||
	            window.mozRequestAnimationFrame    ||
	            function( callback ){
	              window.setTimeout(callback, 1000 / 60);
	            };
	  })();
	
	  onResize();
	  window.addEventListener('resize', onResize, false);
	
	  masthead.appendChild(canvas);
};*/