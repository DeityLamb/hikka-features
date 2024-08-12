import { For, MountableElement, render } from "solid-js/web";
import HikkaFLogoSmall from "@/public/hikka-features-small.svg";
import Teams from "@/utils/notion-db";
import { createResource, createSignal, Show } from "solid-js";
import Disclosure from "@corvu/disclosure";
import { Button } from "@/components/ui/button";
import { Transition } from "solid-transition-group";

export default async function FandubBlock(
  anime_slug: string,
  location?: MountableElement,
  smallerTitle?: boolean
) {
  let [getTeams] = createResource(anime_slug, Teams);

  const [blockState, setBlockState] = createSignal(
    await fandubBlockState.getValue()
  );

  fandubBlockState.watch((state) => setBlockState(state));

  render(
    () => (
      <Transition name="slide-fade">
        <Show when={blockState()}>
          <div id="teams-block">
            <h3
              class={`hikka-features scroll-m-20 font-display ${
                smallerTitle ? "text-lg" : "text-xl"
              } font-bold tracking-normal`}
            >
              Від команд
              <img src={HikkaFLogoSmall} style="width: 21px; height: 20px" />
            </h3>
            <div>
              <Show when={getTeams.loading}>
                <div class="animate-pulse h-10 rounded-md bg-secondary/60" />
                <div class="animate-pulse h-10 rounded-md bg-secondary/60" />
                <div class="animate-pulse h-10 rounded-md bg-secondary/60" />
              </Show>
              <Show when={getTeams() && getTeams()["error"]}>
                <a class="text-muted-foreground">Немає даних</a>
              </Show>
              <Show when={getTeams() && !getTeams()["error"]}>
                <div>
                  <Show when={getTeams().length > 3}>
                    <Disclosure collapseBehavior="hide">
                      {(props) => (
                        <>
                          <For each={getTeams().slice(0, 3)}>
                            {(team) => (
                              <a href={team.telegram} target="_blank">
                                <img
                                  loading="lazy"
                                  src={
                                    STUDIO_LOGOS[
                                      STUDIO_CORRECTED_NAMES[team.title]
                                        ? STUDIO_CORRECTED_NAMES[team.title]
                                            .replaceAll(" ", "")
                                            .toLowerCase()
                                        : team.title
                                            .replaceAll(" ", "")
                                            .toLowerCase()
                                    ] || team.icon
                                  }
                                />
                                {STUDIO_CORRECTED_NAMES[team.title] ||
                                  team.title}
                              </a>
                            )}
                          </For>
                          <Disclosure.Content>
                            <For each={getTeams().slice(3)}>
                              {(team) => (
                                <a href={team.telegram} target="_blank">
                                  <img
                                    loading="lazy"
                                    src={
                                      STUDIO_LOGOS[
                                        STUDIO_CORRECTED_NAMES[team.title]
                                          ? STUDIO_CORRECTED_NAMES[team.title]
                                              .replaceAll(" ", "")
                                              .toLowerCase()
                                          : team.title
                                              .replaceAll(" ", "")
                                              .toLowerCase()
                                      ] || team.icon
                                    }
                                  />
                                  {STUDIO_CORRECTED_NAMES[team.title] ||
                                    team.title}
                                </a>
                              )}
                            </For>
                          </Disclosure.Content>
                          <div class="footer">
                            <Disclosure.Trigger>
                              <Button variant="link" size="sm" class="p-0">
                                {props.expanded
                                  ? "Згорнути..."
                                  : "Показати більше..."}
                              </Button>
                            </Disclosure.Trigger>
                          </div>
                        </>
                      )}
                    </Disclosure>
                  </Show>
                  <Show when={getTeams().length <= 3}>
                    <For each={getTeams()}>
                      {(team) => (
                        <a href={team.telegram} target="_blank">
                          <img
                            loading="lazy"
                            src={
                              STUDIO_LOGOS[
                                STUDIO_CORRECTED_NAMES[team.title]
                                  ? STUDIO_CORRECTED_NAMES[team.title]
                                      .replaceAll(" ", "")
                                      .toLowerCase()
                                  : team.title.replaceAll(" ", "").toLowerCase()
                              ] || team.icon
                            }
                          />
                          {STUDIO_CORRECTED_NAMES[team.title] || team.title}
                        </a>
                      )}
                    </For>
                  </Show>
                </div>
              </Show>
            </div>
          </div>
        </Show>
      </Transition>
    ),
    location ||
      document.querySelector(
        "body > main > div > div.flex.flex-col.gap-4 > div.flex.w-full.flex-col.gap-4 > div"
      )!
  );
}
